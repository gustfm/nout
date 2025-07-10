import { h, render } from "vue";
import UnsavedModal from "../Components/UnsavedModal.vue";

let instance: Record<string, any> = null;

export const UnsavedChangesModal = {
    async openModal() {
        if (!instance) {
            const container = document.createElement("div");
            document.body.appendChild(container);

            const vnode = h(UnsavedModal);
            render(vnode, container);
            instance = vnode.component!.exposed;
        }

        return instance.openModal();
    },
};
