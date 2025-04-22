<template>
  <div class="fixed right-10 top-10">
    <Button
      variant="ghost"
      @click="isDarkMode = !isDarkMode"
      type="button"
      class="rounded-full size-12"
    >
      <Sun
        v-if="isDarkMode"
        class="size-5"
      />
      <Moon
        v-else
        class="size-5"
      />
    </Button>
  </div>
  <div class="h-screen flex items-center justify-center">
    <Card class="w-96 p-5">
      <div class="flex flex-col items-center">
        <div class="mb-8 flex flex-col items-center">
          <img
            class="size-18"
            src="/vite.svg"
            alt=""
          />
        </div>
        <div class="text-sm text-center mb-5">
          <h1 class="text-2xl text-foreground font-semibold mb-1">
            Welcome back
          </h1>
          <p class="text-sm text-foreground/50">Login to your account</p>
        </div>
        <Button
          as="a"
          :href="SSO_LOGIN_URL"
          class="w-full"
        >
          <ShieldUser class="size-5" />
          Login via SSO
        </Button>

        <div class="mt-4 flex flex-col items-center text-foreground/50">
          <p class="text-xs">Version 1.0.0</p>
          <p class="text-xs">Copyright 2025 Concentrix</p>
          <p class="text-xs">All Rights Reserved</p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from "@/components/ui/card/Card.vue";
import Button from "@/components/ui/button/Button.vue";
import { useThemeStore } from "@/store/themeStore.js";
import { onMounted, ref, watch } from "vue";
import { ShieldUser, Sun, Moon } from "lucide-vue-next";

const SSO_LOGIN_URL = import.meta.env.VITE_SSO_LOGIN_URL;
const themeStore = useThemeStore();

const isDarkMode = ref(false);

watch(isDarkMode, () => {
  const theme = isDarkMode.value === true ? "dark" : "light";
  themeStore.setTheme(theme);
});
onMounted(() => {
  isDarkMode.value = themeStore.theme === "dark";
});
</script>
