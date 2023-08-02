import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/api/api.js";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);

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

  const setIsAuthenticated = (authenticated) => {
    isAuthenticated.value = authenticated;
  };

  return { isAuthenticated, setIsAuthenticated, logout };
});
