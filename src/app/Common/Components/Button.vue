<template>
    <button
        class="button"
        ref="buttonRef"
        :disabled="disabled"
        :class="[buttonStyle, fullWidth, buttonSize, toCenter]"
        @click="handleClick"
    >
        <span v-if="hasIconContent" class="button-icon mx-1"><slot name="icon" /></span>
        <span v-if="hasTextContent" class="leading-none button-text" :class="{ 'ml-2': hasIconContent }"><slot /></span>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Ref, toNative, Vue } from "vue-facing-decorator";

enum ButtonType {
    primary = "primary",
}

enum Size {
    small = "small",
    normal = "normal",
    large = "large",
}

@Component({
    emits: ["click"],
})
class Button extends Vue {
    @Prop() public xref: string;
    @Prop() public disabled: boolean;
    @Prop() public full: boolean;
    @Prop() public center: boolean;
    @Prop({ default: Size.normal }) public size: Size;
    @Prop() public type: ButtonType;

    @Ref() public buttonRef: HTMLButtonElement;

    public get buttonStyle(): string {
        const map = {
            primary: "primary-button",
            secondary: "secondary-button",
            danger: "danger-button",
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
            [Size.large]: "large",
        };

        return map[this.size];
    }

    public get toCenter(): string {
        if (this.center) {
            return "flex justify-center items-center";
        }
    }

    public get hasTextContent(): boolean {
        return !!this.$slots.default;
    }

    public get hasIconContent(): boolean {
        return !!this.$slots.icon;
    }

    public handleClick(evt: MouseEvent): void {
        this.$emit("click", evt);
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
        @apply p-1;

        svg {
            width: 20px;
            height: 20px;
        }
    }

    &.large {
        @apply p-3;

        svg {
            width: 25px;
            height: 25px;
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

        .button-text,
        .button-icon {
            padding-top: 1px;
            padding-bottom: 1px;
        }
    }
    &.normal {
        font-size: 14px !important;

        .button-text,
        .button-icon {
            padding-top: 3px;
            padding-bottom: 3px;
        }

        .button-text {
            margin: 2px 0;
        }
    }
    &.large {
        font-size: 16px !important;

        .button-text,
        .button-icon {
            padding-top: 5px;
            padding-bottom: 5px;
        }
    }
}
</style>
