<template>
  <div class="font-inter h-72">
    <div
      class="px-4 py-4 rounded border border-red-700 bg-red-800/10 dark:border-red-800 dark:bg-red-800 dark:bg-opacity-20"
    >
      <h1 class="text-sm text-red-900 dark:text-red-300 font-semibold">
        Failed to Import
      </h1>
      <p class="text-xs text-red-800 dark:text-red-500">
        Unable to import due to validation errors on some rows.
      </p>
    </div>
    <div class="mt-5 rounded overflow-hidden">
      <div class="overflow-y-auto h-48 custom-scrollbar">
        <table class="border-collapse w-full overflow-hidden">
          <thead class="border bg-dark-900 text-white dark:bg-dark-900/50">
            <th
              class="px-2 py-2 border border-neutral-800 text-xs dark:text-neutral-200"
            >
              Row
            </th>
            <th
              class="px-2 py-2 border border-neutral-800 text-xs dark:text-neutral-200"
            >
              Column
            </th>
            <th
              class="px-2 py-2 border border-neutral-800 text-xs dark:text-neutral-200"
            >
              Validation Error
            </th>
          </thead>
          <tbody>
            <tr v-for="error in errors">
              <td class="px-2 py-2 border text-xs dark:text-neutral-400">
                {{ error.row }}
              </td>
              <td class="px-2 py-2 border text-xs dark:text-neutral-400">
                {{ error.column }}
              </td>
              <td
                class="px-2 py-2 border text-xs dark:text-neutral-400 text-wrap"
              >
                {{ error.error }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  errors: {
    type: Array,
    default: [],
  },
});
</script>
