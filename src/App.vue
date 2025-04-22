<template>
  <div>
    <router-view :key="$route.fullPath" />
    <Toaster :theme="themeStore.theme" />
    <GlobalDialogs />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useThemeStore } from "@/store/themeStore.js";
import { Toaster } from "@/components/ui/sonner";
import GlobalDialogs from "@/components/overlays/GlobalDialogs.vue";
import { useAuthStore } from "@/store/authStore.js";

const themeStore = useThemeStore();
const authStore = useAuthStore();

onMounted(() => {
  themeStore.getThemeFromLocalStorage();
  authStore.showToastIfError();
});
</script>
