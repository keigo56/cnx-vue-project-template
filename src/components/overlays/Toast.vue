<template>
  <div
    class="flex items-start w-full p-4 mb-4 text-gray-500 bg-white border rounded-lg shadow font-inter md:items-center md:w-auto dark:border-neutral-800 dark:text-gray-400 dark:bg-neutral-950"
    role="alert"
  >
    <div
      :class="[
        'w-6 h-6 md:w-8 md:h-8 inline-flex items-center justify-center rounded-lg  flex-shrink-0  dark:bg-opacity-70',
        props.toast.type === 'success'
          ? 'text-green-500 bg-green-100 dark:bg-green-900 dark:border dark:border-green-700 dark:text-green-500'
          : '',
        props.toast.type === 'error'
          ? 'text-red-500 bg-red-100 dark:bg-red-900 dark:border dark:border-red-700 dark:text-red-500'
          : '',
        props.toast.type === 'warning'
          ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:border dark:border-yellow-700 dark:text-yellow-500'
          : '',
        props.toast.type === 'info'
          ? 'text-blue-500 bg-blue-100 dark:bg-blue-900 dark:border dark:border-blue-700 dark:text-blue-500'
          : '',
      ]"
    >
      <CheckIcon
        v-if="props.toast.type === 'success'"
        class="w-4 h-4 md:w-5 md:h-5"
      />
      <ExclamationTriangleIcon
        v-if="props.toast.type === 'error'"
        class="w-4 h-4 md:w-5 md:h-5"
      />
      <ExclamationCircleIcon
        v-if="props.toast.type === 'warning'"
        class="w-4 h-4 md:w-5 md:h-5"
      />
      <InformationCircleIcon
        v-if="props.toast.type === 'info'"
        class="w-4 h-4 md:w-5 md:h-5"
      />
    </div>

    <div class="w-full min-w-0 mr-2">
      <p
        class="ml-3 -mt-1 text-sm font-semibold text-gray-900 break-words align-text-top line-clamp-1 text-wrap md:text-base md:mt-0 dark:text-white"
      >
        {{ props.toast.title }}
      </p>
      <p
        class="ml-3 text-xs font-normal text-gray-400 break-words line-clamp-4 text-wrap md:text-sm dark:text-gray-400"
      >
        {{ props.toast.message }}
      </p>
    </div>
    <button
      @click="toastsNotificationStore.removeToast(props.toast.key)"
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1 md:p-1.5 hover:bg-gray-100 inline-flex h-6 w-6 md:h-8 md:w-8 dark:text-gray-500 dark:hover:text-white dark:bg-neutral-900 dark:hover:bg-neutral-800"
      aria-label="Close"
    >
      <svg
        aria-hidden="true"
        class="w-4 h-4 md:w-5 md:h-5"
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
import { useToastNotificationStore } from "@/store/toastNotificationStore.js";
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
  }, 20000);
});
</script>
