import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/api/api.js";

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
