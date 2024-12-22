<template>
    <p v-if="resume" class="text-sm font-bold text-nowrap text-ellipsis overflow-hidden">{{ resume }}</p>
    <p v-else class="text-sm text-nowrap text-ellipsis overflow-hidden italic text-slate-700">New note</p>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

interface Props {
    resume: string;
}

const { resume } = defineProps<Props>();
</script>
