<template>
  <div class="fixed right-10 top-10">
    <button
      @click="isDarkMode = false"
      v-show="isDarkMode"
      type="button"
      class="py-3 px-3 focus:outline-none rounded-full hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-dark-900 dark:hover:bg-dark-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 dark:text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    </button>

    <button
      @click="isDarkMode = true"
      v-show="!isDarkMode"
      type="button"
      class="py-3 px-3 focus:outline-none rounded-full hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-dark-900 dark:hover:bg-dark-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </button>
  </div>
  <div class="dark:bg-dark-900 h-screen flex items-center justify-center">
    <div class="flex flex-col items-center">
      <div class="mb-10 flex flex-col items-center">
        <img class="w-24 h-24 mb-3" :src="logo" alt="" />
      </div>
      <div
        class="block w-96 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <p
          class="text-center mb-5 text-lg font-semibold text-gray-900 dark:text-white"
        >
          Login to Application
        </p>
        <a
          :href="SSO_LOGIN_URL"
          class="w-full flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
            />
          </svg>

          <span>Login via SSO</span>
        </a>
      </div>
      <div class="mt-4 flex flex-col items-center">
        <p class="dark:text-gray-500 text-sm">Version 1.0.0</p>
        <p class="dark:text-gray-500 text-sm">
          Copyright 2023 Business Analytics
        </p>
        <p class="dark:text-gray-500 text-sm">All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from "@/store/global/themeStore.js";
import logo from "@/assets/logo.svg";
import { onMounted, ref, watch } from "vue";

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
