<template>
    <li
        class="flex items-center text-sm rounded-md pr-3 pl-1 py-1 mb-1"
        :class="{ 'is-selected': isSelected }"
        @click.prevent.stop="selectFolder(folder.id)"
    >
        <EmotePickerDropdown :value="folder.icon" @changeEmote="changeFolderEmote" />
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
import EmotePickerDropdown from "../Common/Components/EmotePickerDropdown.vue";

@Component({
    components: { FolderIcon, EmotePickerDropdown },
    emits: ["selectFolder", "changeFolderEmote"],
})
class FolderItem extends Vue {
    @Prop() public readonly folder: Folder;
    @Prop() public readonly isSelected: Boolean;

    public selectFolder(id: number): void {
        this.$emit("selectFolder", id);
    }

    public changeFolderEmote(folderIcon: string) {
        this.$emit("changeFolderEmote", this.folder.id, folderIcon);
    }
}

export default toNative(FolderItem);
</script>

<style scoped lang="scss">
li {
    cursor: pointer;
    color: var(--primary-text-color);

    &:hover {
        background-color: var(--primary-color-hover);
    }
    &.is-selected {
        background-color: var(--primary-color);
        color: var(--primary-text-color);
    }

    .icon {
        color: #e48a03;
        width: 1.2rem;
        height: 1.2rem;
    }
    .folder-emote {
        font-size: 11px;
    }
}
</style>
