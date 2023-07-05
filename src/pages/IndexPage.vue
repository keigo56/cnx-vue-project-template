<template>
  <BaseLayout v-if="authStore.isAuthenticated">
    <div class="p-4">
      <button
          @click="confirmationModalStore.openModal()"
          type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Open Modal
      </button>
      <button
          @click="paymentModalStore.openModal()"
          type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Open Another Modal
      </button>

      <button
          @click="albumsStore.getAlbums()"
          type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Get Data
      </button>

      <button
          @click="albumsStore.addAlbum()"
          type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Add Album
      </button>
    </div>

    <div>
      <div>
        <BaseTable
            :columns="albumsStore.columns"
            :data="albumsStore.albums"
            :actions="albumsStore.actions"
            :has-action-item="true"
            @delete-item="paymentModalStore.openModal()"
            @edit-item="albumsStore.editAlbum"
        />
      </div>
    </div>
    <PaymentModal/>
    <ConfirmationModal />
  </BaseLayout>
  <GuestLayout v-if="!authStore.isAuthenticated"/>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {useAuthStore} from "@/store/auth/authStore.js";
import GuestLayout from "@/layouts/GuestLayout.vue";
import ConfirmationModal from "@/components/overlays/ConfirmationModal.vue";
import {useConfirmationModalStore} from "@/store/modals/confirmationModalStore.js";
import {usePaymentModalStore} from "@/store/modals/paymentModalStore.js";
import PaymentModal from "@/components/overlays/PaymentModal.vue";
import {useAlbumsStore} from "@/store/queries/albumStore.js";
import BaseTable from "@/components/lists/BaseTable.vue";

const confirmationModalStore = useConfirmationModalStore()
const paymentModalStore = usePaymentModalStore()

const authStore = useAuthStore()
const albumsStore = useAlbumsStore()

</script>
