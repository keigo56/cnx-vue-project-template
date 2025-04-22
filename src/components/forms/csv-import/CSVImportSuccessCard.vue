<template>
  <div>
    <div
      class="h-72 px-4 grid place-items-center rounded border border-green-800 bg-green-100/40 dark:border-green-600/50 dark:bg-green-900/5"
    >
      <div class="mx-auto text-center">
        <CheckCircleIcon
          class="h-12 w-12 text-green-700 dark:text-green-500 inline mb-2"
        />
        <h1 class="text-green-700 dark:text-green-500 font-semibold">
          Import Successful
        </h1>

        <p
          class="text-sm font-semibold dark:font-normal dark:text-neutral-300 mt-4"
        >
          {{ rows }} {{ rows === 1 ? "row" : "rows" }} has been successfully
          imported.
        </p>

        <p class="text-xs text-neutral-600 dark:text-neutral-400">
          Check the table to ensure the imported data is accurate.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
defineProps({
  rows: { type: Number, default: 0 },
});
</script>
