<template>
  <BaseModal
    title="Delete Role"
    :is-open="isOpen"
  >
    <div class="my-5">
      <Form
        :data="formData"
        url="/api/datatable/roles/delete"
        method="DELETE"
        id="delete_role_form"
        @on-success="successHandler"
      >
      </Form>
      <p class="dark:text-white text-sm">
        Are you sure you want to delete this role?
      </p>
    </div>

    <div class="mt-4 flex space-x-2">
      <button
        form="delete_role_form"
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-red-800 text-gray-100 dark:text-white px-4 py-2 text-sm font-medium dark:hover:bg-red-700 hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Delete
      </button>

      <button
        @click="closeModal()"
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
import { ref } from "vue";
import { useToastNotificationStore } from "@/store/toastNotificationStore.js";
import Form from "@/components/forms/Form.vue";
import InputField from "@/components/forms/InputField.vue";

const isOpen = ref(false);

const formData = ref({
  id: 0,
  name: "",
});

const formValidationErrors = ref({});

defineExpose({
  setData,
  openModal,
  closeModal,
});

const emit = defineEmits(["success"]);

function setData(row) {
  formData.value = { ...row };
}

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  resetForm();
  isOpen.value = false;
}

function resetForm() {
  formData.value = {
    name: "",
  };

  formValidationErrors.value = {};
}

function successHandler() {
  const toastNotification = useToastNotificationStore();
  toastNotification.addToast({
    type: "success",
    title: "Success",
    message: "Deleted Role successfully",
  });

  closeModal();
  emit("success");
  resetForm();
}
</script>
