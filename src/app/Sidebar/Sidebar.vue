<template>
    <ul class="sidebar">
        <h6 class="text-xs font-medium my-1">Folders</h6>
        <SidebarItem name="All notes" :suffix="3" :selected="true" />
    </ul>
</template>

<script lang="ts" setup>
import SidebarItem from "./SidebarItem.vue";
</script>

<style scoped>
@import "../../styles/vars.scss";

.sidebar {
    width: 250px;
    min-width: 250px;
    height: 100vh;
    padding: 8px;
    border-right: 1px solid var(--default-border-color);
}
.sidebar h6 {
    padding: 0;
    color: var(--gray-500);
}
</style>
