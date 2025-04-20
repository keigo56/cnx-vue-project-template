import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const error = ref(null);

  const user = ref(null);
  const permissions = ref([]);
  const roles = ref([]);

  async function setData(data) {
    if (!data) {
      return;
    }

    user.value = data.user || null;
    permissions.value = data.permissions || [];
    roles.value = data.roles || [];
  }

  function isAuthenticated() {
    return !!user.value;
  }

  function hasPermission(permission) {
    return permissions.value.includes(permission);
  }

  function hasRole(role) {
    return roles.value.includes(role);
  }

  function showToastIfError() {
    if (!error.value) return;

    const errorMessages = {
      ERR_BAD_REQUEST: {
        type: "error",
        title: "Request Error",
        description: "Something went wrong. Please try again.",
      },
      ERR_NETWORK: {
        type: "error",
        title: "Server Unavailable",
        description: "Unable to connect to the server. Please try again.",
      },
      ECONNABORTED: {
        type: "warning",
        title: "Request Timeout",
        description:
          "The request took too long to process and was aborted. Please check your network connection and try again.",
      },
    };

    const errorConfig = errorMessages[error.value.code];
    if (errorConfig) {
      toast[errorConfig.type](errorConfig.title, {
        description: errorConfig.description,
      });
    }
  }

  function reset() {
    error.value = null;
    user.value = null;
    permissions.value = [];
    roles.value = [];
  }

  return {
    error,
    user,
    permissions,
    roles,
    setData,
    hasPermission,
    hasRole,
    isAuthenticated,
    reset,
    showToastIfError,
  };
});
