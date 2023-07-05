import { defineStore } from "pinia";
import { computed } from "vue";
import { api } from "@/api/api.js";

const SESSION_STORAGE_KEY = "authToken";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = computed(() => {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) !== null;
  });

  const logout = () => {
    return api
      .delete("/api/auth/logout")
      .then(() => {
        sessionStorage.clear();
        window.location = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { isAuthenticated, logout };
});
