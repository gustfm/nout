<template>
    <li class="flex items-center text-sm rounded-md px-3 py-1.5" :class="{ selected }">
        <FolderIcon class="icon mr-1" />
        <div class="flex justify-between w-full">
            <span>{{ name }}</span>
            <span class="text-gray-500">{{ suffix }}</span>
        </div>
    </li>
</template>

<script lang="ts" setup>
import { FolderIcon } from "@heroicons/vue/24/outline";

interface Props {
    name: String;
    suffix: Number;
    selected: Boolean;
}

const { selected, name, suffix } = defineProps<Props>();
</script>

<style scoped>
li {
    cursor: pointer;
    color: #161616;
}
li:hover,
li.selected {
    background-color: var(--gray-200);
}
li .icon {
    color: #e48a03;
    width: 1.2rem;
    height: 1.2rem;
}
</style>
