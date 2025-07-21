<template>
    <p v-if="title" class="heading-text text-sm font-bold text-nowrap text-ellipsis overflow-hidden flex items-center">
        <span v-if="isNoteFixed" class="note-infos mr-1">📌</span>
        <span v-if="hasUnsavedChanges" class="note-infos mr-1">⬆️</span>
        {{ title }}
    </p>
    <p v-else class="heading-text text-sm text-nowrap text-ellipsis overflow-hidden italic">Empty note</p>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

interface Props {
    title: string;
    hasUnsavedChanges: boolean | null;
    isNoteFixed: boolean;
}

const { title, hasUnsavedChanges, isNoteFixed } = defineProps<Props>();
</script>

<style scoped>
.note-infos {
    font-size: 10px;
}
</style>