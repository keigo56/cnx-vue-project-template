<template>
  <BaseModal :dismissible="false" title="Delete Confirmation" :is-open="confirmationModalStore.isOpen" @closed-modal="confirmationModalStore.closeModal()">
    <div class="mt-2">
      <p class="text-sm text-gray-500">
        Your payment has been successfully submitted. We’ve sent you
        an email with all of the details of your order.
      </p>
    </div>

    <div class="mt-4">
      <button
          @click="confirmationModalStore.closeModal()"
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

      >
        Got it, thanks!
      </button>
    </div>
  </BaseModal>

</template>

<script setup>
import BaseModal from "@/components/overlays/BaseModal.vue";
import {useConfirmationModalStore} from "@/store/modals/confirmationModalStore.js";
const confirmationModalStore = useConfirmationModalStore()

</script>
