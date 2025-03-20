<template>
    <header class="note-container-header flex justify-between items-center">
        <Button type="ghost" :disabled="isSavingSelectedNote" @click="deleteNote()">
            <template #icon>
                <TrashIcon />
            </template>
        </Button>
        <small class="text-gray-500 mr-2" v-if="isSavingSelectedNote">saving note...</small>
        <Button class="save-button" type="primary" :disabled="isSavingSelectedNote" @click="saveCurrentNoteContent()">
            Save
        </Button>
    </header>
</template>

<script lang="ts">
import { TrashIcon } from "@heroicons/vue/24/outline";
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";
import Button from "../Common/Components/Button.vue";

@Component({
    components: { TrashIcon, Button },
    emits: ["deleteNote", "saveCurrentNoteContent"],
})
class NoteContainerHeader extends Vue {
    @Prop() public readonly isSavingSelectedNote: boolean;

    public deleteNote() {
        this.$emit("deleteNote");
    }

    public saveCurrentNoteContent() {
        this.$emit("saveCurrentNoteContent");
    }
}

export default toNative(NoteContainerHeader);
</script>

<style scoped lang="scss">
@use "../../styles/vars.scss" as *;

.note-container-header {
    padding: 8px;
    border-bottom: 1px solid var(--default-border-color);

    .save-button {
        @apply px-3 !important;
    }
}
</style>
