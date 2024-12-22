<template>
    <header class="header-notes-list flex justify-end">
        <button class="border-0 rounded p-1.5" @click="createNote()"><PlusIcon /></button>
    </header>
</template>

<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/24/outline";

interface Emits {
    (event: "createNote"): void;
}

const emit = defineEmits<Emits>();

const createNote = () => emit("createNote");
</script>

<style scoped lang="scss">
@import "../../styles/vars.scss";

.header-notes-list {
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
