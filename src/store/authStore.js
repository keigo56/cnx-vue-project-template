import { defineStore } from "pinia";

import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
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

  function reset() {
    user.value = null;
    permissions.value = [];
    roles.value = [];
  }

  return {
    user,
    permissions,
    roles,
    setData,
    hasPermission,
    hasRole,
    isAuthenticated,
    reset,
  };
});
