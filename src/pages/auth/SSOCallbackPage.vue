<template>
  <div
    class="dark:bg-dark-900 text-black dark:text-white h-screen flex items-center justify-center"
  >
    <div class="mb-10 flex flex-col items-center">
      <img class="w-24 h-24 mb-3" :src="logo" alt="" />
      <p class="dark:text-white mb-3 text-xl">Please wait for a moment</p>
      <p class="dark:text-gray-400 text-sm">Logging you in...</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/auth/userStore.js";
import { onMounted } from "vue";
import { api } from "@/api/api.js";
import logo from "@/assets/logo.svg";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

onMounted(() => {
  /*
   * Get the API Token from the query, coming from the server
   * */
  const API_TOKEN = route.query.token.toString();

  /*
   * If the token does not exist, clear the session storage and redirect to index page
   * */
  if (!API_TOKEN) {
    router.push({
      path: "/login",
    });
  }

  api.get("sanctum/csrf-cookie").then((response) => {
    api
      .post(
        "auth/token/validate",
        {},
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            Accept: "application/json",
          },
        }
      )
      .then(() => {
        router.push({
          path: "/",
        });
      });
  });
});
</script>
