import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/api/api.js";
import { useAuthStore } from "@/store/auth/authStore.js";

export const useUserStore = defineStore("user", () => {
  const isLoading = ref(false);
  const user = ref({
    id: 1,
    name: "Sample User",
    email: "sample.user@email.com",
    workday_id: "1234151",
    position: "Role Name",
  });

  const permissions = ref([]);

  function getUser() {
    isLoading.value = true;

    return api
      .get("/api/user")
      .then((response) => {
        // Set global variable of isAuthenticated to true
        const authStore = useAuthStore();
        authStore.setIsAuthenticated(true);

        user.value = response.data.user;
        permissions.value = response.data.permissions;
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        isLoading.value = false;
      });
  }
  return { user, permissions, isLoading, getUser };
});
