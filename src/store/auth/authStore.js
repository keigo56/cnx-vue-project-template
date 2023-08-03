import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/api/api.js";
import router from "@/routes/router.js";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);

  const logout = () => {
    return api
      .delete("/api/auth/logout")
      .then(async () => {
        await router.push({
          path: "/login",
        });
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
