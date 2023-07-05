<template>
  <div class="w-full font-inter">
    <div class="w-full flex-grow bg-white dark:bg-dark-900">
      <NavbarGuest/>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import NavbarGuest from "@/components/navigation/NavbarGuest.vue";
</script>
