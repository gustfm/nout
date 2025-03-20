<template>
    <div class="skeleton flex flex-col">
        <div v-for="i in adaptedRows" :key="i" class="skeleton-item mb-2"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, toNative, Vue } from "vue-facing-decorator";

@Component({})
class Skeleton extends Vue {
    @Prop() public rows: number;
    @Prop() public height: number;

    public get adaptedRows() {
        const randomNumber = Math.random() * (6 - 2) + 2;
        return Array.from({ length: randomNumber }, (_, i) => i);
    }
}

export default toNative(Skeleton);
</script>

<style lang="scss">
.skeleton {
    padding: 8px;

    .skeleton-item {
        padding: 12px 14px;
        border-radius: 6px;
        position: relative;
        background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
        background-size: 400% 100%;
        height: 45px;
        width: 100%;
        animation: skeleton-loading 1.4s ease infinite;
    }
}
@keyframes skeleton-loading {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
</style>
