<template>
    <div class="note-container">
        <div v-if="!selectedNote" class="w-full h-full flex flex-col justify-center items-center">
            <p class="text-lg text-gray-800 font-normal">No note selected</p>
        </div>
        <div v-else class="h-full flex flex-col w-full">
            <NoteContainerHeader @deleteNote="deleteNote(selectedNote.id)" />
            <Editor v-model="noteContent" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, WritableComputedRef } from "vue";
import Editor from "./Editor.vue";
import Note from "../Note/Note";
import NoteContainerHeader from "./NoteContainerHeader.vue";

interface Props {
    selectedNote: Note | null;
}

interface Emits {
    (event: "update:content", value: string): void;
    (event: "deleteNote", selectedNoteId: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const noteContent: WritableComputedRef<string> = computed({
    get() {
        return props.selectedNote?.content;
    },
    set(value: string) {
        emit("update:content", value);
    },
});

const deleteNote = (id: number) => {
    emit("deleteNote", id);
};
</script>

<style lang="scss">
.note-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
}
</style>
