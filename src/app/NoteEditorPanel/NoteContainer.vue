<template>
    <div class="note-container">
        <div v-if="!selectedNote" class="w-full h-full flex flex-col justify-center items-center">
            <p class="text-lg text-gray-800 font-normal">No note selected</p>
        </div>
        <div v-else class="h-full flex flex-col w-full">
            <NoteContainerHeader
                :isSavingSelectedNote="isSavingSelectedNote"
                @deleteNote="deleteNote(selectedNote.id)"
                @saveCurrentNoteContent="saveCurrentNoteContent()"
            />
            <NoteEditor v-model="noteContent"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";
import Note from "../Notes/Models/Note";
import NoteEditor from "./NoteEditor.vue";
import NoteContainerHeader from "./NoteContainerHeader.vue";
import EditorContent from "./Models/EditorContent";

@Component({
    components: { NoteEditor, NoteContainerHeader },
    emits: ["update:content", "deleteNote", "saveCurrentNoteContent"],
})
class NoteContainer extends Vue {
    @Prop() public selectedNote: Note | null;
    @Prop() public readonly isSavingSelectedNote: boolean;

    public get noteContent() {
        return this.selectedNote.content;
    }

    public set noteContent(content: string) {
        this.selectedNote.content = content;
    }

    // public setTitle(content: EditorContent) {
    //     const breakIndex = content.raw?.indexOf("\n") ?? 27;
    //     this.selectedNote.title = content.raw?.slice(0, breakIndex);
    // }

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
