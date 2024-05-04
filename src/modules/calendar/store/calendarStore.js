import { defineStore } from "pinia";
import { ref } from "vue";

export const useCalendarStore = defineStore("calendar", () => {
  const rowHeightInRems = ref(4);

  return { rowHeightInRems };
});
