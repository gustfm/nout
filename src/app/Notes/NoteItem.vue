<template>
    <li class="note-item cursor-pointer mb-2" :class="{ 'is-selected': isSelected }" @click="selectNote(note.id)">
        <NoteTitle :title="useTagsStrip.stripHtmlTags(note.title)" />
        <NoteDescription :content="useTagsStrip.stripHtmlTags(note.content)" />
        <p class="text-xs text-nowrap text-ellipsis overflow-hidden text-slate-600">{{ formatDate(note.createdAt) }}</p>
    </li>
</template>

<script lang="ts">
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";
import Note from "./Models/Note";
import { useTagsStrip } from "../Common/UseCases/useTagsStrip";
import NoteTitle from "./NoteTitle.vue";
import NoteDescription from "./NoteDescription.vue";

dayjs.extend(LocalizedFormat);

@Component({
    components: { NoteTitle, NoteDescription },
    emits: ["selectNote"],
})
class NoteItem extends Vue {
    @Prop() public note: Note;
    @Prop() public isSelected: boolean;

    public useTagsStrip: any = null;

    public created() {
        this.useTagsStrip = useTagsStrip();
    }

    public selectNote(id: number): void {
        this.$emit("selectNote", id);
    }

    public formatDate(date: string): string {
        return dayjs(date).format("LL");
    }
}

export default toNative(NoteItem);
</script>

<style scoped lang="scss">
.note-item {
    padding: 12px 14px;
    border-radius: 6px;
    position: relative;
}
.note-item.is-selected,
.note-item:hover {
    background-color: #f1eaab;
}
</style>
