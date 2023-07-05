<template>
  <div
    class="flex items-center p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    role="alert"
  >
    <div
      :class="[
        'inline-flex items-center justify-center rounded-lg  flex-shrink-0 w-8 h-8',
        props.toast.type === 'success'
          ? 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200'
          : '',
        props.toast.type === 'error'
          ? 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200'
          : '',
        props.toast.type === 'warning'
          ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200'
          : '',
        props.toast.type === 'info'
          ? 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200'
          : '',
      ]"
    >
      <CheckIcon v-if="props.toast.type === 'success'" class="w-5 h-5" />
      <ExclamationTriangleIcon
        v-if="props.toast.type === 'error'"
        class="w-5 h-5"
      />
      <ExclamationCircleIcon
        v-if="props.toast.type === 'warning'"
        class="w-5 h-5"
      />
      <InformationCircleIcon
        v-if="props.toast.type === 'info'"
        class="w-5 h-5"
      />
      <span class="sr-only">Error icon</span>
    </div>

    <div class="mr-2">
      <div class="ml-3 text-base font-semibold text-gray-900 dark:text-white">
        {{ props.toast.title }}
      </div>
      <div class="ml-3 text-sm font-normal text-gray-400 dark:text-gray-400">
        {{ props.toast.message }}
      </div>
    </div>
    <button
      @click="toastsNotificationStore.removeToast(props.toast.key)"
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useToastNotificationStore } from "@/store/global/toastNotificationStore.js";
import {
  CheckIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/vue/20/solid";
import { onMounted } from "vue";

const toastsNotificationStore = useToastNotificationStore();

const props = defineProps({
  toast: {
    type: Object,
    default: {
      key: "toast-key",
      title: "",
      message: "",
      type: "success",
    },
  },
});

onMounted(() => {
  setTimeout(() => {
    toastsNotificationStore.removeToast(props.toast.key);
  }, 5000);
});
</script>
