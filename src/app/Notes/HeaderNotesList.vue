<template>
    <header class="header-notes-list flex justify-end">
        <Button type="ghost" @click="createNote()">
            <template #icon>
                <PlusIcon />
            </template>
        </Button>
    </header>
</template>

<script lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import { Component, toNative, Vue } from "vue-facing-decorator";
import Button from "../Common/Components/Button.vue";

@Component({
    components: { PlusIcon, Button },
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
}
</style>
