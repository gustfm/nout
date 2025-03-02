<template>
    <div class="relative inline-block text-left w-full" ref="dropdownRef">
        <button class="ghost-button create-folder px-3" @click="toggleDropdown()">
            <PlusCircleIcon />
            Nova pasta
        </button>

        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div v-if="isOpen" class="dropdown-menu absolute mt-2 w-54 bg-white border border-gray-200 rounded-lg shadow-md">
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
                    <small class="text-gray-500 text-xs">Aperte enter para criar a pasta</small>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { Component, toNative, Vue } from "vue-facing-decorator";
import { useDropdown } from "../Composables/useDropdown";

@Component({
    components: { PlusCircleIcon },
})
class NewFolderModal extends Vue {
    public folderName: string = "";
    public dropdownComposable: any = null;

    public get isOpen() {
        return this.dropdownComposable?.isOpen;
    }

    public mounted() {
        this.dropdownComposable = useDropdown();
    }

    public toggleDropdown() {
        this.dropdownComposable.toggleDropdown();
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
.create-folder {
    width: 100%;
    font-size: 12px;
    display: flex;
    align-items: center;
    font-family: "Inter", sans-serif;
    margin-top: 10px;

    svg {
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }
}
.dropdown-menu {
    top: -105px;
}
</style>
