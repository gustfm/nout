<template>
    <p v-if="title" class="text-sm font-bold text-nowrap text-ellipsis overflow-hidden">{{ title }}</p>
    <p v-else class="text-sm text-nowrap text-ellipsis overflow-hidden italic text-slate-700">New note</p>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

interface Props {
    title: string;
}

const { title } = defineProps<Props>();
</script>
