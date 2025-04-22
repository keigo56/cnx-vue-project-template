import { defineStore } from "pinia";
import { ref } from "vue";

export const useLogoutDialogStore = defineStore("logoutDialogStore", () => {
  const visible = ref(false);

  function show() {
    visible.value = true;
  }

  function hide() {
    visible.value = false;
  }

  return { show, hide, visible };
});
