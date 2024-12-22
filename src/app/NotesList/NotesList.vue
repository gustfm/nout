<template>
    <div class="notes-list flex flex-col">
        <HeaderNotesList @createNote="createNote" />
        <div v-if="isLoadingNotes && notes?.length">Loading...</div>
        <ul v-else class="overflow-scroll h-100 small-scroll">
            <NoteItem
                v-for="note in notes"
                :key="note?.id"
                :isSelected="selectedNote?.id === note?.id"
                :note="note"
                @selectNote="selectNote"
            />
        </ul>
    </div>
</template>

<script lang="ts" setup>
import Note from "../Note/Note";
import HeaderNotesList from "./HeaderNotesList.vue";
import NoteItem from "./NoteItem.vue";

interface Props {
    notes: Array<Note> | null;
    selectedNote: Note | null;
    isLoadingNotes: boolean;
}

interface Emits {
    (event: "selectNote", value: number | null): void;
    (event: "createNote"): void;
}

const { isLoadingNotes, selectedNote, notes } = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectNote = (id: number) => emit("selectNote", id);
const createNote = () => emit("createNote");
</script>

<style scoped>
.notes-list {
    width: 300px;
    min-width: 300px;
    border-right: 1px solid #ddd7d6;
}
.notes-list ul {
    padding: 8px 0 8px 8px;
}
.small-scroll:not(:hover)::-webkit-scrollbar-thumb {
    background: transparent;
}
.small-scroll::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
.small-scroll:not(:hover).always-appear-scroll::-webkit-scrollbar-thumb,
.small-scroll::-webkit-scrollbar-thumb {
    background: rgba(200, 200, 200, 0.7);
    width: 3px;
    height: 3px;
    border-radius: 15px;
    border: 3px solid transparent;
    background-clip: content-box;
}
.small-scroll.is-dark::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    width: 3px;
    height: 3px;
    border-radius: 15px;
    border: 3px solid transparent;
    background-clip: content-box;
}
.small-scroll::-webkit-scrollbar-thumb {
    background: rgba(200, 200, 200, 0.7);
    width: 2.3px;
    height: 2.3px;
    border-radius: 15px;
    border: 2.3px solid transparent;
    background-clip: content-box;
}
.small-scroll::-webkit-scrollbar-track {
    background: transparent;
}
</style>
