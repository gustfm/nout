<template>
    <li
        class="flex items-center text-sm rounded-md pr-3 pl-2 py-1.5"
        :class="{ isSelected }"
        @click.prevent.stop="selectFolder(folder.id)"
    >
        <EmotePickerDropdown />
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
    emits: ["selectFolder"],
})
class FolderItem extends Vue {
    @Prop() public readonly folder: Folder;
    @Prop() public readonly isSelected: Boolean;

    public selectFolder(id: number): void {
        console.log("????");
        this.$emit("selectFolder", id);
    }
}

export default toNative(FolderItem);
</script>

<style scoped lang="scss">
li {
    cursor: pointer;
    color: #161616;

    &:hover,
    .isSelected {
        background-color: var(--gray-200);
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
