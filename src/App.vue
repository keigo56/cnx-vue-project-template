<template>
  <div>
    <router-view :key="$route.fullPath" />
    <ToastList />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useThemeStore } from "@/store/global/themeStore.js";
import ToastList from "@/components/overlays/ToastList.vue";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.getThemeFromLocalStorage();
});
</script>
