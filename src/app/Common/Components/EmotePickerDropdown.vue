<template>
    <div class="emote-picker-dropdown relative">
        <button
            ref="dropdownButton"
            class="folder-emote rounded-md mr-1.5"
            @click.prevent.stop="() => [toggleDropdown(), updateDropdownPosition()]"
        >
            {{ value }}
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
                            v-for="(emote, index) in emotes"
                            :key="index"
                            @click.prevent.stop="changeEmote(emote.skins[0].native)"
                        >
                            {{ emote.skins[0].native }}
                        </Button>
                    </div>

                    <div>
                        <button v-for="i in Array.from({ length: maxPages }, (_, i) => i).map(i => i+1)" @click="currentPage = i">{{ i }}</button>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";
import { ComposableDropdown, useDropdown } from "../Composables/useDropdown";
import Button from "./Button.vue";
import rawEmotes from '../Constants/raw_emotes.json';
import RawEmotes from "../Models/RawEmotes";

@Component({
    components: {
        Button,
    },
    emits: ['changeEmote']
})
class EmotePickerDropdown extends Vue {
    @Prop() public value: string;

    public dropdownComposable: ComposableDropdown = null;

    public pageSize = 63;
    public currentPage = 3;

    public get isOpen() {
        return this.dropdownComposable?.isOpen;
    }

    public get dropdownPosition() {
        return this.dropdownComposable?.dropdownPosition;
    }

    public get maxPages() {
        return Math.floor((rawEmotes as RawEmotes[]).length / this.pageSize);
    }

    public get emotes() {
        if (this.currentPage === 1) {
            return rawEmotes.slice(0, this.pageSize);
        }
        const end = this.pageSize * this.currentPage;
        const start = end - this.pageSize;
        return rawEmotes.slice(start, end);
    }

    public async mounted() {
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

    public changeEmote(emote: string) {
        this.$emit('changeEmote', emote);
        this.toggleDropdown();
    }
}

export default toNative(EmotePickerDropdown);
</script>

<style scoped lang="scss">
.folder-emote {
    padding: 1px 3px;
    font-size: 15px;

    &:hover {
        background-color: var(--secondary-color-hover);
    }
}
.dropdown-menu {
    background-color: var(--background-color);
    border-color: var(--regular-border-color);
} 
.emote-picker-container {
    width: 290px;
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
