import { ref, onMounted, onUnmounted } from "vue";

export function useDropdown() {
    const isOpen = ref<boolean>(false);
    const dropdownRef = ref(null);

    const toggleDropdown = () => {
        console.log("!!!");
        isOpen.value = !isOpen.value;
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
            isOpen.value = false;
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            isOpen.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeydown);
    });

    onUnmounted(() => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleKeydown);
    });

    return { isOpen, dropdownRef, toggleDropdown };
}
