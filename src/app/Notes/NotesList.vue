<template>
    <div class="notes-list flex flex-col">
        <HeaderNotesList @createNote="createNote" />
        <Skeleton v-if="isLoadingNotes" />
        <Empty v-else-if="isNotesEmpty" icon="📚" message="No notes created yet" />
        <ul v-else class="overflow-scroll h-100 small-scroll">
            <NoteItem
                v-for="note in notes"
                :key="note?.id"
                :isSelected="selectedNote?.id === note?.id"
                :note="note"
                @selectNote="selectNote"
            />
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";
import Note from "./Models/Note";
import NoteItem from "./NoteItem.vue";
import HeaderNotesList from "./HeaderNotesList.vue";
import Empty from "../Common/Components/Empty.vue";
import Skeleton from "../Common/Components/Skeleton.vue";

@Component({
    components: { HeaderNotesList, NoteItem, Empty, Skeleton },
    emits: ["selectNote"],
})
class NotesList extends Vue {
    @Prop() public notes: Array<Note>;
    @Prop() public selectedNote: Note;
    @Prop() public isLoadingNotes: boolean;

    public get isNotesEmpty(): boolean {
        return !this.notes?.length;
    }

    public selectNote(id: number): void {
        this.$emit("selectNote", id);
    }

    public createNote(): void {
        this.$emit("createNote");
    }
}

export default toNative(NotesList);
</script>

<style scoped>
.notes-list {
    width: 300px;
    min-width: 300px;
    border-right: 1px solid #ddd7d6;
}
.notes-list ul {
    padding: 8px 0 8px 8px;
}
</style>
