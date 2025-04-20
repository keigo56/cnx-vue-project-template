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

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.getThemeFromLocalStorage();
});
</script>
