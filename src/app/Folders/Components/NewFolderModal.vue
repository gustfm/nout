<template>
    <div class="new-folder-modal relative inline-block text-left w-full">
        <Button ref="dropdownButton" class="mt-2 px-3" type="ghost" size="small" :full="true" @click="toggleDropdown()">
            <template #icon>
                <PlusCircleIcon />
            </template>
            Nova pasta
        </Button>

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
                class="dropdown-menu absolute top-[-105px] mt-2 w-54 bg-white border rounded-lg shadow-md"
            >
                <div class="py-2 px-2">
                    <h5 class="text-sm mb-2">Nova pasta</h5>
                    <input
                        v-model="folderName"
                        ref="folderNameInput"
                        id="email"
                        type="email"
                        placeholder="Digite o nome da sua pasta"
                        class="w-full px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md shadow-sm outline-none transition-all focus:ring-.5 focus:ring-gray-900 focus:border-gray-400"
                        @keyup="createFolder"
                    />
                    <small class="text-xs">Pressione enter para criar a pasta</small>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { Component, Ref, toNative, Vue } from "vue-facing-decorator";
import { useDropdown } from "../../Common/Composables/useDropdown";
import Button from "../../../app/Common/Components/Button.vue";

@Component({
    components: { PlusCircleIcon, Button },
})
class NewFolderModal extends Vue {
    public folderName: string = "";
    public dropdownComposable: any = null;

    public get isOpen() {
        return this.dropdownComposable?.isOpen;
    }

    public mounted() {
        this.dropdownComposable = useDropdown(
            this.$refs.dropdownButton.buttonRef as HTMLElement,
            this.$refs.dropdownMenu as HTMLElement
        );
        this.dropdownComposable.createListeners();
    }

    public unmounted() {
        this.dropdownComposable.destroyListeners();
    }

    public toggleDropdown() {
        this.dropdownComposable.toggleDropdown();
        this.$nextTick(() => {
            this.$refs?.folderNameInput?.focus();
        });
    }

    public createFolder(e: KeyboardEvent): void {
        if (e.key === "Enter") {
            this.$emit("createFolder", this.folderName);
            this.toggleDropdown();
        }
    }
}

export default toNative(NewFolderModal);
</script>

<style scoped lang="scss">
.new-folder-modal {
    .dropdown-menu {
        background-color: var(--background-color);
        border-color: var(--regular-border-color);

        h5 {
            color: var(--regular-text-color);
        }
        input {
            background-color: var(--sub-background-color);
            color: var(--regular-text-color);
            border-color: var(--regular-border-color);
        }
        small {
            color: var(--secondary-text-color);
        }
    }
}
</style>
