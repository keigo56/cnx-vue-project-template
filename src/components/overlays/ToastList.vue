<template>
  <div
    class="fixed w-full px-5 z-[100] md:max-w-xs md:px-0 bottom-3 md:bottom-5 md:right-5"
  >
    <TransitionGroup
      tag="div"
      enter-from-class="translate-y-full opacity-0 md:translate-x-full md:translate-y-px"
      enter-active-class="duration-300"
      leave-active-class="duration-300"
      leave-to-class="translate-y-full opacity-0 md:translate-x-full md:translate-y-px"
    >
      <Toast
        :toast="toast"
        :key="toast.key"
        v-for="toast in toastsNotificationStore.toasts"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import Toast from "@/components/overlays/Toast.vue";
import { useToastNotificationStore } from "@/store/toastNotificationStore.js";

const toastsNotificationStore = useToastNotificationStore();
</script>
