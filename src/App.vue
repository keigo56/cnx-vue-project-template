<template>
  <div>
    <router-view :key="$route.fullPath" />
    <ToastList />
    <LogoutConfirmationModal />
  </div>
</template>

<script setup>
import { useThemeStore } from "@/store/global/themeStore.js";
import ToastList from "@/components/overlays/ToastList.vue";
import LogoutConfirmationModal from "@/components/overlays/LogoutConfirmationModal.vue";
import { useUserStore } from "@/store/auth/userStore.js";

const themeStore = useThemeStore();
themeStore.getThemeFromLocalStorage();
</script>
