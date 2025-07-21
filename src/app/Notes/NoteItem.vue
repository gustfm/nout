<template>
    <li
        class="note-item cursor-pointer mb-2"
        ref="dropdownButton"
        :class="{ 'is-selected': isSelected }"
        @click.left="selectNote(note.id)"
        @click.right="toggleContextMenu()"
    >
        <NoteTitle
            :title="useTagsStrip.stripHtmlTags(note.title)"
            :hasUnsavedChanges="hasUnsavedChanges"
            :isNoteFixed="isNoteFixed"
        />
        <NoteDescription :content="noteContent" />
        <p class="subtle-text text-xs text-nowrap text-ellipsis overflow-hidden text-slate-600">
            {{ formatDate(note.createdAt) }}
        </p>
    </li>
    <NoteContextMenu ref="contextMenu" :isPinned="note.isFixed" :triggerButton="triggerButton" @handlePin="handlePin" @handleUnpin="handleUnpin" />
</template>

<script lang="ts">
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Component, Prop, Ref, toNative, Vue } from "vue-facing-decorator";
import { useTagsStrip } from "../Common/UseCases/useTagsStrip";
import Note from "./Models/Note";
import NoteContextMenu from "./NoteContextMenu.vue";
import NoteDescription from "./NoteDescription.vue";
import NoteTitle from "./NoteTitle.vue";

dayjs.extend(LocalizedFormat);

@Component({
    components: { NoteTitle, NoteDescription, NoteContextMenu },
    emits: ["selectNote", "handlePin", "handleUnpin"],
})
class NoteItem extends Vue {
    @Prop() public note: Note;
    @Prop() public isSelected: boolean;
    @Prop() public hasSeletedNoteContentUnsavedChanges: boolean;
    @Prop() public isNoteFixed: boolean;

    @Ref("dropdownButton") readonly dropdownButtonRef!: HTMLElement;
    public triggerButton: HTMLElement | null = null;

    public useTagsStrip: any = null;
    public isOpen: boolean = false;

    public get hasUnsavedChanges(): boolean {
        return (
            this.hasSeletedNoteContentUnsavedChanges !== null &&
            this.hasSeletedNoteContentUnsavedChanges &&
            this.isSelected
        );
    }

    public get noteContent(): string {
        const cleanContent = this.useTagsStrip.stripHtmlTags(this.note.content);
        const startIndex = this.note.title.trim().length;
        return cleanContent.slice(startIndex, 80);
    }

    public created() {
        this.useTagsStrip = useTagsStrip();
    }

    public mounted() {
        this.triggerButton = this.dropdownButtonRef;
    }

    public toggleContextMenu() {
        // @ts-ignore
        this.$refs.contextMenu.toggleDropdown();
    }

    public selectNote(id: number): void {
        this.$emit("selectNote", id);
    }

    public formatDate(date: string): string {
        return dayjs(date).format("LL");
    }

    public handlePin() {
        this.$emit("handlePin", this.note.id);
        this.toggleContextMenu();
    }

    public handleUnpin() {
        this.$emit("handleUnpin", this.note.id);
        this.toggleContextMenu();
    }
}

export default toNative(NoteItem);
</script>

<style scoped lang="scss">
.note-item {
    padding: 12px 14px;
    border-radius: 6px;
    position: relative;
    color: var(--primary-text-color);
}
.note-item:hover {
    background-color: var(--primary-color-hover);
}
.note-item.is-selected {
    background-color: var(--primary-color);
    color: var(--primary-text-color);
}

.dropdown-menu {
    background-color: var(--background-color);
    border-color: var(--regular-border-color);
}
.note-item-menu-container {
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
