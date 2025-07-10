<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div
            class="unsaved-modal rounded-2xl shadow-xl w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto transform scale-95 opacity-0 animate-fade-in-zoom"
        >
            <div class="p-6 text-center">
                <h3 class="text-xl font-semibold unsaved-modal__title mb-2">Alterações não salvas 🫨</h3>
                <p class="unsaved-modal__description text-sm mb-6">
                    O conteúdo desta nota não foi salvo. Deseja descartar as alterações ou continuar editando?
                </p>

                <div class="flex flex-col space-y-3">
                    <Button type="danger" size="large" :center="true" @click="onDiscard">Descartar Alterações</Button>
                    <Button type="secondary" size="large" :center="true" @click="onKeepEditing"
                        >Continuar editando</Button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Button from "./Button.vue";

let _resolve: (value?: unknown) => void;
let _reject: (reason?: any) => void;

// const props = defineProps<{ modelValue: boolean }>();
// const emit = defineEmits<{
//     (e: "update:modelValue", value: boolean): void;
// }>();

// const isVisible = computed({
//     get: () => props.modelValue,
//     set: (val: boolean) => emit("update:modelValue", val),
// });

const isVisible = ref(false);

const openModal = () => {
    isVisible.value = true;

    return new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });
};

const closeModal = () => {
    isVisible.value = false;
};

const onDiscard = () => {
    console.log("Alterações descartadas!");
    closeModal();
    _resolve();
};

const onKeepEditing = () => {
    console.log("Continuar editando!");
    closeModal();
    _reject();
};

defineExpose({ openModal });
</script>

<style scoped lang="scss">
.unsaved-modal {
    background-color: var(--background-color);

    &__title {
        color: var(--heading-text-color);
        // text-gray-200
    }
    &__description {
        color: var(--subtle-text-color);
        // text-gray-400
    }
}

.animate-fade-in-zoom {
    animation: fade-in-zoom 0.1s ease-out forwards;
}

@keyframes fade-in-zoom {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
