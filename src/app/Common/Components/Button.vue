<template>
    <button class="button" :disabled="disabled" :class="[buttonStyle, fullWidth, buttonSize]" @click="$emit('click')">
        <slot v-if="hasIconContent" name="icon" />
        <span v-if="hasTextContent" class="leading-none ml-2"><slot /></span>
    </button>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";

enum ButtonType {
    primary = "primary",
}

enum Size {
    small = "small",
    normal = "normal",
}

@Component({
    emits: ["click"],
})
class Button extends Vue {
    @Prop() public disabled: boolean;
    @Prop() public full: boolean;
    @Prop({ default: Size.normal }) public size: Size;
    @Prop() public type: ButtonType;

    public get buttonStyle(): string {
        const map = {
            primary: "primary-button",
            secondary: "secondary-button",
            ghost: "ghost-button",
        };

        return map[this.type];
    }

    public get fullWidth(): string {
        return this.full ? "w-full" : null;
    }

    public get buttonSize(): string {
        const map = {
            [Size.small]: "small",
            [Size.normal]: "normal",
        };

        return map[this.size];
    }

    public get hasTextContent(): boolean {
        return !!this.$slots.default;
    }

    public get hasIconContent(): boolean {
        return !!this.$slots.icon;
    }
}

export default toNative(Button);
</script>

<style lang="scss">
.button {
    &.small {
        @apply p-2;

        svg {
            width: 15px;
            height: 15px;
        }
    }
    &.normal {
        @apply p-1.5;

        svg {
            width: 20px;
            height: 20px;
        }
    }
}
</style>

<style scoped lang="scss">
.button {
    display: flex;
    align-items: center;
    font-family: "Inter", sans-serif;

    &.small {
        font-size: 12px !important;
    }
    &.normal {
        font-size: 14px !important;
    }
}
</style>
