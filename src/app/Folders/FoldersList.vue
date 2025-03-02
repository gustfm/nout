<template>
    <ul class="folders-list-container">
        <h6 class="text-xs font-semibold my-1">Folders</h6>
        <div class="folders-list">
            <FolderItem
                v-for="folder in folders"
                :key="folder.id"
                :folder="folder"
                :isSelected="selectedFolder?.id === folder?.id"
                @selectFolder="selectFolder"
            />
        </div>

        <NewFolderModal @createFolder="createFolder" />
    </ul>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";
import NewFolderModal from "../../app/Folders/Components/NewFolderModal.vue";
import FolderItem from "./FolderItem.vue";
import Folder from "./Models/Folder";

@Component({
    components: { FolderItem, NewFolderModal },
    emits: ["selectFolder", "createFolder"],
})
class FoldersList extends Vue {
    @Prop() public folders: Array<Folder>;
    @Prop() public selectedFolder: Folder;

    public selectFolder(id: number) {
        this.$emit("selectFolder", id);
    }

    public createFolder(folderName: string) {
        this.$emit("createFolder", folderName);
    }
}

export default toNative(FoldersList);
</script>

<style scoped>
@use "../../styles/vars.scss" as *;

.folders-list-container {
    width: 250px;
    min-width: 250px;
    height: 100vh;
    padding: 8px;
    border-right: 1px solid var(--default-border-color);
}
.folders-list-container h6 {
    padding: 0;
    color: var(--gray-700) !important;
}
.folders-list {
    height: calc(100% - 65px);
}
</style>
