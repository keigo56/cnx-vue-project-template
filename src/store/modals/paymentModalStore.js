import { defineStore } from "pinia";
import { ref } from "vue";

export const usePaymentModalStore = defineStore("paymentModal", () => {
  const isOpen = ref(false);

  function openModal() {
    isOpen.value = true;
  }

  function closeModal() {
    isOpen.value = false;
  }

  function proceedDelete() {}

  return { isOpen, openModal, closeModal };
});
