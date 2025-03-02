<template>
    <p v-if="content" class="text-xs text-nowrap text-ellipsis overflow-hidden text-slate-600">{{ content }}</p>
    <p v-else class="text-xs italic text-nowrap text-ellipsis overflow-hidden text-slate-800">New note content</p>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

interface Props {
    content: string;
}

const { content } = defineProps<Props>();
</script>
