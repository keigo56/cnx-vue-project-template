<template>
  <nav class="dark:bg-dark-900  dark:text-white relative flex h-16 items-center justify-between border-b dark:border-b-dark-100 px-10">
    <div></div>
    <div>
      <a :href="SSO_LOGIN_URL">Login</a>
    </div>
  </nav>
</template>

<script setup>
const SSO_LOGIN_URL = import.meta.env.VITE_SSO_LOGIN_URL
</script>
