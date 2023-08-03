<template>
  <h1 v-if="userStore.isLoading">Validating auth token, please wait...</h1>
  <h1 v-if="!userStore.isLoading">
    Done validating... Redirecting to home page
  </h1>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/auth/userStore.js";
import { onMounted } from "vue";
import { api } from "@/api/api.js";

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
    sessionStorage.clear();
    router.push({
      path: "/",
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
