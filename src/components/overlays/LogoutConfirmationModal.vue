<template>
  <BaseModal
    title="Logout Confirmation"
    :is-open="logoutModalStore.visible"
    @closed-modal="logoutModalStore.closeModal()"
  >
    <div class="mt-2">
      <p class="text-sm text-gray-500">Are you sure you want to logout?</p>
    </div>

    <div class="mt-4 flex space-x-2">
      <button
        @click="logoutModalStore.logout()"
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-brand-800 text-gray-100 dark:text-white px-4 py-2 text-sm font-medium text-blue-900 dark:hover:bg-brand-700 hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Confirm
      </button>

      <button
        @click="logoutModalStore.closeModal()"
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent dark:text-white px-4 py-2 text-sm font-medium dark:hover:bg-brand-700 hover:bg-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Cancel
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from "@/components/overlays/BaseModal.vue";
import { useLogoutModalStore } from "@/store/auth/logoutModalStore.js";
const logoutModalStore = useLogoutModalStore();
</script>
