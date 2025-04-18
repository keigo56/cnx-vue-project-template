import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/api/api.js";
import router from "@/router/router.js";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);

  const logout = () => {
    return api
      .delete("/admin/auth/logout")
      .then(async () => {
        await router.push({
          path: "/admin/login",
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
