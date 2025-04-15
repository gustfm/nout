<template>
    <div class="empty-state flex flex-col justify-center items-center h-full">
        <span class="icon mr-1">{{ icon }}</span>
        <span class="message">{{ message }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";

@Component({})
class NotesList extends Vue {
    @Prop() public icon: string;
    @Prop() public message: string;
}

export default toNative(NotesList);
</script>

<style lang="scss">
.empty-state {
    .icon {
        font-size: 24px;
    }
    .message {
        font-size: 14px;
        font-family: "Inter", sans-serif;
        color: var(--regular-text-color);
    }
}
</style>
