<template>
    <div class="relative">
        <button
            ref="dropdownButton"
            class="folder-emote rounded-md mr-1.5"
            @click.prevent.stop="() => [toggleDropdown(), updateDropdownPosition()]"
        >
            
        </button>

        <Teleport to="body">
            <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
                <div
                    v-show="isOpen"
                    ref="dropdownMenu"
                    class="dropdown-menu left-[9px] absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-md"
                    :style="dropdownPosition"
                >
                    <div class="emote-picker-container flex flex-wrap justify-center p-3 m-auto">
                        <Button
                            type="ghost"
                            class="emote-button"
                            v-for="(emote, index) in emotes.slice(0, 56)"
                            :key="index"
                            @click.prevent.stop="console.log(emote)"
                        >
                            {{ emote }}
                        </Button>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import { ComposableDropdown, useDropdown } from "../Composables/useDropdown";
import { Component, toNative, Vue } from "vue-facing-decorator";
import Button from "./Button.vue";

@Component({
    components: {
        Button,
    },
})
class EmotePickerDropdown extends Vue {
    public dropdownComposable: ComposableDropdown = null;

    public emotes: any[] = [];

    public get isOpen() {
        return this.dropdownComposable?.isOpen;
    }

    public get dropdownPosition() {
        return this.dropdownComposable?.dropdownPosition;
    }

    public async mounted() {
        const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");
        const data = await response.json();

        this.emotes = Object.entries(data.emojis).map(([emojiName, emoji]) => emoji.skins[0].native);

        this.dropdownComposable = useDropdown(this.$refs.dropdownButton as HTMLElement, this.$refs.dropdownMenu as HTMLElement);
        this.dropdownComposable.createListeners();
    }

    public unmounted() {
        this.dropdownComposable.destroyListeners();
    }

    public toggleDropdown() {
        this.dropdownComposable.toggleDropdown();
    }

    public updateDropdownPosition() {
        this.dropdownComposable.updateDropdownPosition();
    }
}

export default toNative(EmotePickerDropdown);
</script>

<style scoped lang="scss">
.emote-picker-container {
    width: 300px;
    max-height: 400px;
    overflow: auto;

    .emote-button {
        height: 28px;
        width: 28px;
        font-size: 17px !important;
        padding: 0.5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
