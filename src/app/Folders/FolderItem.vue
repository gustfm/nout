<template>
    <li class="flex items-center text-sm rounded-md px-3 py-1.5" :class="{ isSelected }" @click="selectFolder(folder.id)">
        <FolderIcon class="icon mr-1" />
        <div class="flex justify-between w-full">
            <span>{{ folder.name }}</span>
            <span class="text-gray-500">{{ folder.notesCount }}</span>
        </div>
    </li>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";
import Folder from "./Models/Folder";
import { FolderIcon } from "@heroicons/vue/24/outline";

@Component({
    components: { FolderIcon },
    emits: ["selectFolder"],
})
class FolderItem extends Vue {
    @Prop() public readonly folder: Folder;
    @Prop() public readonly isSelected: Boolean;

    public selectFolder(id: number): void {
        this.$emit("selectFolder", id);
    }
}

export default toNative(FolderItem);
</script>

<style scoped>
li {
    cursor: pointer;
    color: #161616;
}
li:hover,
li.isSelected {
    background-color: var(--gray-200);
}
li .icon {
    color: #e48a03;
    width: 1.2rem;
    height: 1.2rem;
}
</style>
