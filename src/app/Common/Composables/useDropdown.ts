import { CSSProperties, ref } from "vue";

export interface ComposableDropdown {
    isOpen: boolean;
    dropdownPosition: CSSProperties;
    toggleDropdown(): void;
    createListeners(): void;
    destroyListeners(): void;
    updateDropdownPosition(): void;
}

export function useDropdown(
    dropdownButton: HTMLElement,
    dropdownMenu: HTMLElement,
    direction: "bottom" | "right" = "bottom"
): ComposableDropdown {
    const isOpen = ref<boolean>(false);
    const dropdownPosition = ref<CSSProperties>({});

    const toggleDropdown = (): void => {
        isOpen.value = !isOpen.value;
        if (isOpen.value) {
            updateDropdownPosition();
        }
    };

    const handleClickOutside = (event: MouseEvent): void => {
        if (isOpen && !dropdownButton.contains(event.target as Node) && !dropdownMenu.contains(event.target as Node)) {
            isOpen.value = false;
        }
    };

    const handleKeydown = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
            isOpen.value = false;
        }
    };

    const createListeners = (): void => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeydown);
    };

    const destroyListeners = (): void => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleKeydown);
    };

    const updateDropdownPosition = (): void => {
        const button = dropdownButton as HTMLElement;
        const buttonRect = button.getBoundingClientRect();

        if (direction === "bottom") {
            dropdownPosition.value = {
                top: `${buttonRect.bottom + window.scrollY}px`,
            };
        } else if (direction === "right") {
            const style = window.getComputedStyle(button, null);
            dropdownPosition.value = {
                top: `${buttonRect.top - parseFloat(style.marginBottom) + window.scrollY}px`,
            };
        }
    };

    return { isOpen, dropdownPosition, toggleDropdown, createListeners, destroyListeners, updateDropdownPosition };
}
