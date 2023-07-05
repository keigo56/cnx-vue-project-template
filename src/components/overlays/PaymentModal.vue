<template>
  <BaseModal title="Delete Confirmation" :is-open="paymentModalStore.isOpen" @closed-modal="paymentModalStore.closeModal()">
    <div class="mt-2">
      <p class="text-sm text-gray-500">
       Payment has been process click exit
      </p>
    </div>

    <div class="mt-4">
      <button
          @click="paymentModalStore.closeModal()"
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

      >
        Exit
      </button>
    </div>
  </BaseModal>

</template>

<script setup>
import BaseModal from "@/components/overlays/BaseModal.vue";
import {usePaymentModalStore} from "@/store/modals/paymentModalStore.js";

const paymentModalStore = usePaymentModalStore()
</script>
