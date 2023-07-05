import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "@/store/auth/authStore.js";

export const useLogoutModalStore = defineStore("logoutModalStore", () => {
  const visible = ref(false);
  const authStore = useAuthStore();

  function openModal() {
    visible.value = true;
  }

  function closeModal() {
    visible.value = false;
  }

  function logout() {
    closeModal();
    authStore.logout();
  }

  return { visible, openModal, closeModal, logout };
});
