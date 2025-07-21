<template>
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
                class="dropdown-menu left-[540px] absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-md"
                :style="dropdownPosition"
            >
                <ul class="note-item-menu-container flex flex-wrap p-2 m-auto">
                    <h6 class="text-xs font-semibold my-1">Actions</h6>
                    <li class="cursor-pointer rounded-lg p-2 py-1" @click="isPinned ? handleUnpin() : handlePin()">
                        📌 {{ isPinned ? "Unpin" : "Pin" }}
                    </li>
                </ul>
            </div>
        </transition>
    </Teleport>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue, Watch } from "vue-facing-decorator";
import { ComposableDropdown, useDropdown } from "../Common/Composables/useDropdown";

@Component({
    emits: ["handlePin", "handleUnpin"],
})
class NoteItem extends Vue {
    @Prop() public triggerButton: HTMLElement;
    @Prop() public isPinned: boolean;

    public dropdownComposable: ComposableDropdown = null;

    public get isOpen() {
        return this.dropdownComposable?.isOpen;
    }

    public get dropdownPosition() {
        return this.dropdownComposable?.dropdownPosition;
    }

    @Watch("triggerButton")
    public async onTriggerChanged() {
        if (this.triggerButton) {
            this.dropdownComposable = useDropdown(
                this.triggerButton as HTMLElement,
                this.$refs.dropdownMenu as HTMLElement,
                "right"
            );
            this.dropdownComposable.createListeners();
        }
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

    public handlePin() {
        this.$emit("handlePin");
    }

    public handleUnpin() {
        this.$emit("handleUnpin");
    }
}

export default toNative(NoteItem);
</script>

<style scoped lang="scss">
.dropdown-menu {
    background-color: var(--background-color);
    border-color: var(--regular-border-color);
    color: var(--regular-text-color);
}
.note-item-menu-container {
    width: 200px;
    max-height: 400px;
    overflow: auto;

    li {
        width: 100%;
        border-radius: 6px;
        font-size: 14px;
        border: 1px solid transparent;

        &:hover {
            background-color: var(--primary-color-hover);
            border: 1px solid var(--secondary-border-color);
        }
    }
}
</style>
