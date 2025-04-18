<template>
  <div class="w-full flex flex-row font-inter h-screen overflow-hidden">
    <div class="w-72 flex-shrink-0 h-screen">
      <Sidebar />
    </div>
    <div
      class="w-[calc(100%-18rem)] h-screen min-h-screen flex-grow bg-white dark:bg-dark-900"
    >
      <Navbar />
      <main class="overflow-auto max-h-screen pb-20">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/navigation/Sidebar.vue";
import Navbar from "@/components/navigation/Navbar.vue";
</script>
