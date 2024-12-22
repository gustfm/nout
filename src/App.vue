<template>
    <div class="application">
        <Sidebar />
        <NotesList
            :notes="notes"
            :selectedNote="selectedNote"
            :isLoadingNotes="isLoadingNotes"
            @selectNote="selectNote"
            @createNote="createNote"
        />
        <NoteContainer :selectedNote="selectedNote" @update:content="updateNoteContent" @deleteNote="deleteNode" />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import Sidebar from "./app/Sidebar/Sidebar.vue";
import NotesList from "./app/NotesList/NotesList.vue";
import NoteContainer from "./app/NoteEditorPanel/NoteContainer.vue";
import { useNotes } from "./app/Note/useNotes";

const { notesRepository } = window;
const { notes, isNotesLoaded, selectedNote, updateNoteContent, loadNotes, selectNote, createNote, deleteNode } =
    useNotes(notesRepository);
const isLoadingNotes = computed(() => !isNotesLoaded.value);

onMounted(async () => {
    await loadNotes();
});
</script>

<style scoped>
.application {
    width: 100vw;
    height: 100vh;
    display: flex;
}
</style>
