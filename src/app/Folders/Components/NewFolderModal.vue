<template>
    <div class="relative inline-block text-left w-full" ref="dropdownRef">
        <Button class="mt-2 px-3" type="ghost" size="small" :full="true" @click="toggleDropdown()">
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
            <div v-if="isOpen" class="dropdown-menu absolute top-[-105px] mt-2 w-54 bg-white border border-gray-200 rounded-lg shadow-md">
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
                    <small class="text-gray-500 text-xs">Pressione enter para criar a pasta</small>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { Component, toNative, Vue } from "vue-facing-decorator";
import { useDropdown } from "../Composables/useDropdown";
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
        this.dropdownComposable = useDropdown();
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
