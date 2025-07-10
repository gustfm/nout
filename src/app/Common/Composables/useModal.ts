import { ref } from "vue";

export interface ComposableModal {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export function useModal(): ComposableModal {
    const isOpen = ref<boolean>(false);

    const openModal = (): void => {
        isOpen.value = true;
    };

    const closeModal = (): void => {
        isOpen.value = false;
    };

    return { isOpen, openModal, closeModal };
}
