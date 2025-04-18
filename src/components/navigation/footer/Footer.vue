<template>
  <footer
    class="rounded-lg shadow bg-gradient-to-br from-purple-400 to-blue-300 m-4 transition-all duration-1000 ease-in-out"
  >
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <img
          :src="cnxlogo"
          class="w-96 mix-blend-multiply"
        />
        <!-- <a
          href="/"
          class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap"
            >Concentrix + Webhelp</span
          >
        </a> -->
        <ul
          class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0"
        >
          <li>
            <a
              href="#"
              class="hover:underline me-4 md:me-6"
              >About</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:underline me-4 md:me-6"
              >Privacy Policy</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:underline me-4 md:me-6"
              >Licensing</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:underline"
              >Contact</a
            >
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-700 sm:mx-auto lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center"
        >© 2024
        <a
          href="/"
          class="hover:underline"
          >Business Analytics™</a
        >. All Rights Reserved.</span
      >
    </div>
  </footer>
</template>

<script setup>
import cnxlogo from "@/assets/cnxlogo.png";
</script>
