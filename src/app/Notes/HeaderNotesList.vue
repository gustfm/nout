<template>
    <header class="header-notes-list flex justify-end">
        <button class="ghost-button" @click="createNote()"><PlusIcon /></button>
    </header>
</template>

<script lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import { Component, toNative, Vue } from "vue-facing-decorator";

@Component({
    components: { PlusIcon },
})
class HeaderNotesList extends Vue {
    public createNote() {
        this.$emit("createNote");
    }
}

export default toNative(HeaderNotesList);
</script>

<style scoped lang="scss">
@use "../../styles/vars.scss" as *;

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
