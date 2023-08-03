<template>
  <h1>Login page</h1>
  <a :href="SSO_LOGIN_URL" class="text-blue-700">Login</a>
</template>

<script setup>
const SSO_LOGIN_URL = import.meta.env.VITE_SSO_LOGIN_URL;
</script>
