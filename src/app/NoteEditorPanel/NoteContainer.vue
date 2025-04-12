<template>
    <div class="note-container">
        <Empty v-if="!selectedNote" icon="📒" message="No note selected" />
        <div v-else class="h-full flex flex-col w-full">
            <NoteContainerHeader
                :isSavingSelectedNote="isSavingSelectedNote"
                @deleteNote="deleteNote(selectedNote.id)"
                @saveCurrentNoteContent="saveCurrentNoteContent()"
            />
            <NoteEditor
                :selectedNote="selectedNote"
                @contentUpdated="(content: EditorContent) => [setTitle(content), selectedNote.content = content.html]"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";
import Note from "../Notes/Models/Note";
import NoteEditor from "./NoteEditor.vue";
import NoteContainerHeader from "./NoteContainerHeader.vue";
import EditorContent from "./Models/EditorContent";
import Empty from "../Common/Components/Empty.vue";

@Component({
    components: { NoteEditor, NoteContainerHeader, Empty },
    emits: ["update:content", "deleteNote", "saveCurrentNoteContent"],
})
class NoteContainer extends Vue {
    @Prop() public selectedNote: Note | null;
    @Prop() public readonly isSavingSelectedNote: boolean;

    public setTitle(content: EditorContent) {
        const breakIndex = content.raw?.indexOf("\n");
        this.selectedNote.title = content.raw?.slice(0, breakIndex > 0 ? breakIndex + 1 : 27);
    }

    public deleteNote(id: number) {
        this.$emit("deleteNote", id);
    }

    public saveCurrentNoteContent() {
        this.$emit("saveCurrentNoteContent");
    }
}

export default toNative(NoteContainer);
</script>

<style lang="scss">
.note-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
}
</style>
