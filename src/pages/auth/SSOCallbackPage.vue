<template>
  <div
    class="flex items-center justify-center h-screen text-black dark:bg-dark-900 dark:text-white"
  >
    <div class="flex flex-col items-center mb-10">
      <img
        class="w-24 h-24 mb-3"
        :src="logo"
        alt=""
      />
      <p class="mb-3 text-xl dark:text-white">Please wait for a moment</p>
      <p class="text-sm dark:text-gray-400">Logging you in...</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import logo from "@/assets/logo.svg";
import { getCookie } from "@/utils/cookies.js";
import { authService } from "@/services/authService";

const router = useRouter();

onMounted(async () => {
  /*
   * Get the API Token from cookie, coming from the server
   * */
  const API_TOKEN = getCookie("azure_authorization");

  if (!API_TOKEN) {
    router.push({ path: "/login" });
    return;
  }

  await authService.validateToken(API_TOKEN);

  router.push({
    path: "/",
  });
});
</script>
