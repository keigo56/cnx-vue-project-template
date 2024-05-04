<template>
  <div class="dark:bg-dark-900 rounded overflow-hidden flex w-min">
    <span
      class="text-xs font-medium px-2.5 py-0.5 dark:bg-opacity-30 dark:border rounded"
      :class="[generateStyleClass()]"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "success",
  },
});

const generateStyleClass = () => {
  switch (props.type) {
    case "green":
      return " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-600 border-green-900";
    case "red":
      return " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-500 border-red-900";
    case "yellow":
      return " bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-600 border-yellow-900";
    case "indigo":
      return " bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-600 border-indigo-900";
    case "gray":
      return " bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400 border-gray-900";
    default:
      return " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-600 border-blue-900";
  }
};
</script>
