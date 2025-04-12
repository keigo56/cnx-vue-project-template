<template>
  <div
    class="rounded p-2 border border-red-800 bg-red-800/10 dark:border-red-800 dark:bg-red-800 dark:bg-opacity-20"
  >
    <div class="flex space-x-2 items-center">
      <ExclamationTriangleIcon class="w-3 h-3 text-red-900 dark:text-red-400" />
      <p
        class="text-xs font-inter text-red-900 font-semibold dark:font-normal dark:text-red-400"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";

defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>
