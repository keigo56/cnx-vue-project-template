import { defineStore } from "pinia";
import {ref} from "vue";

export const useToastNotificationStore = defineStore("toastNotification", () => {

    const toasts = ref([]);

    const addToast = (toast) => {
        toasts.value.push({
            key: Symbol(),
            ...toast
        })
    }

    const removeToast = (key) => {
        const index = toasts.value.findIndex((toast) => toast.key === key);
        if (index !== -1) {
            toasts.value.splice(index, 1);
        }
    };

    return { toasts, addToast, removeToast };
});