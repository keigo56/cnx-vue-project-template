<template>
  <div>
    <router-view :key="$route.fullPath" />
    <ToastList />
    <GlobalDialogs />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useThemeStore } from "@/store/themeStore.js";
import ToastList from "@/components/overlays/ToastList.vue";
import GlobalDialogs from "@/components/overlays/GlobalDialogs.vue";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.getThemeFromLocalStorage();
});
</script>
