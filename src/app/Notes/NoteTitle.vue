<template>
    <p v-if="title" class="text-sm font-bold text-nowrap text-ellipsis overflow-hidden flex items-center">
        <span v-if="hasUnsavedChanges" class="unsaved-changes-info mr-1">⬆️</span>
        {{ title }}
    </p>
    <p v-else class="text-sm text-nowrap text-ellipsis overflow-hidden italic text-slate-700">Empty note</p>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

interface Props {
    title: string;
    hasUnsavedChanges: boolean | null
}

const { title, hasUnsavedChanges } = defineProps<Props>();
</script>
