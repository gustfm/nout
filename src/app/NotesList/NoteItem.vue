<template>
    <li class="note-item cursor-pointer mb-2" :class="{ 'is-selected': isSelected }" @click="selectNote(note.id)">
        <NoteTitle :resume="note.resume" />
        <NoteDescription :content="note.content" />
        <p class="text-xs text-nowrap text-ellipsis overflow-hidden text-slate-600">{{ formatDate(note.createdAt) }}</p>
    </li>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Note from "../Note/Note";
import NoteDescription from "./NoteDescription.vue";
import NoteTitle from "./NoteTitle.vue";

dayjs.extend(LocalizedFormat);

interface Props {
    note: Note;
    isSelected: Boolean;
}

interface Emits {
    (event: "selectNote", value: number | null): void;
}

const { note, isSelected } = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectNote = (id: number) => emit("selectNote", id);
const formatDate = (date: string) => dayjs(date).format("LL");
</script>

<style scoped lang="scss">
.note-item {
    padding: 12px;
    border-radius: 6px;
}
.note-item.is-selected,
.note-item:hover {
    background-color: #f1eaab;
}
</style>
