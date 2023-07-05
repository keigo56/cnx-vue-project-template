<template>
<div class="fixed bottom-5 right-5 max-w-xs w-full">
  <TransitionGroup
      tag="div"
      enter-from-class="translate-x-full opacity-0"
      enter-active-class="duration-300"
      leave-active-class="duration-300"
      leave-to-class="translate-x-full opacity-0"
  >
  <Toast :toast="toast" :key="toast.key" v-for="toast in toastsNotificationStore.toasts"/>
  </TransitionGroup>
</div>
</template>

<script setup>
import Toast from "@/components/overlays/Toast.vue";
import {useToastNotificationStore} from "@/store/global/toastNotificationStore.js";

const toastsNotificationStore = useToastNotificationStore()

</script>
