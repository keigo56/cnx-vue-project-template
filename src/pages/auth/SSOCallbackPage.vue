<template>
  <div class="flex items-center justify-center h-screen bg-background">
    <div class="flex flex-col items-center mb-10">
      <img
        class="w-24 h-24 mb-3"
        src="/vite.svg"
        alt=""
      />
      <p class="mb-1 text-xl font-semibold">Please wait for a moment</p>
      <p class="text-foreground/70">Logging you in...</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
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
