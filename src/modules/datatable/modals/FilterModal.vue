<template>
  <BaseModal :title="title" :is-open="isOpen">
    <div class="mt-2">
      <p>To Follow</p>
    </div>

    <div class="mt-4">
      <button
        @click="closeModal()"
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Close
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import BaseModal from "@/components/overlays/BaseModal.vue";
import { ref } from "vue";

const isOpen = ref(false);
const title = ref("Filter Modal");
const columns = ref([]);

/*
 * Expose this method to parent
 * */
defineExpose({
  openModal,
  closeModal,
});

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  console.log(title.value);
  isOpen.value = false;
}
</script>
