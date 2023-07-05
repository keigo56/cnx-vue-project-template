<template>
<h1 v-if="userStore.isLoading">Validating auth token, please wait...</h1>
<h1 v-if="!userStore.isLoading">Done validating... Redirecting to home page</h1>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/store/auth/userStore.js";
import {onMounted} from "vue";

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

onMounted(()=>{
  /*
  * Get the API Token from the query, coming from the server
  * */
  const API_TOKEN = route.query.token.toString()

  /*
  * If the token does not exist, clear the session storage and redirect to index page
  * */
  if(!API_TOKEN){
    sessionStorage.clear()
    router.push({
      path: '/'
    })
  }

  /*
  * Save the token in the session storage
  * */
  sessionStorage.setItem('authToken', API_TOKEN)

  /*
   * Get the authenticated user from the API using the auth token provided
   * Redirect to homepage if successful
   * */
  userStore
      .getUser()
      .then(()=>{
        router.push({
          path: '/'
        })
      })
})
</script>
