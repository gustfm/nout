<template>
    <header class="note-container-header flex justify-start">
        <button class="border-0 rounded p-1.5" @click="deleteNote()"><TrashIcon /></button>
    </header>
</template>

<script lang="ts" setup>
import { TrashIcon } from "@heroicons/vue/24/outline";

interface Emits {
    (event: "deleteNote"): void;
}

const emit = defineEmits<Emits>();

const deleteNote = () => emit("deleteNote");
</script>

<style scoped lang="scss">
@import "../../styles/vars.scss";

.note-container-header {
    padding: 8px;
    border-bottom: 1px solid var(--default-border-color);

    button {
        svg {
            width: 20px;
            height: 20px;
        }

        &:hover {
            background-color: var(--gray-200);
        }
    }
}
</style>
