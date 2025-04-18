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
import { api } from "@/api/api.js";
import logo from "@/assets/logo.svg";
import { getCookie } from "@/utils/cookies.js";

const router = useRouter();

onMounted(async () => {
  /*
   * Get the API Token from cookie, coming from the server
   * */
  const API_TOKEN = getCookie("azure_authorization");

  await api.get("sanctum/csrf-cookie");
  await api.post(
    "/admin/auth/token/validate",
    {},
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );
  router.push({
    path: "/admin",
  });
});
</script>
