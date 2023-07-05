<template>
  <BaseModal title="Remove User" :is-open="isOpen">
    <div class="my-5">
      <Form
        :data="formData"
        url="/api/users/delete"
        method="DELETE"
        id="delete_user_form"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
      >
      </Form>
      <p class="dark:text-white text-sm">
        Are you sure you want to remove this user?
      </p>
    </div>

    <div class="mt-4 flex space-x-2">
      <button
        form="delete_user_form"
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-red-800 text-gray-100 dark:text-white px-4 py-2 text-sm font-medium dark:hover:bg-red-700 hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Remove
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
import { onMounted, ref } from "vue";
import { useToastNotificationStore } from "@/store/global/toastNotificationStore.js";
import Form from "@/components/forms/Form.vue";
import { api } from "@/api/api.js";
import SelectField from "@/components/forms/SelectField.vue";
import ComboBoxField from "@/components/forms/ComboBoxField.vue";

const isOpen = ref(false);

const formData = ref({});

defineExpose({
  openModal,
  closeModal,
  setData,
});

const emit = defineEmits(["success"]);

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  resetForm();
  isOpen.value = false;
}

function resetForm() {
  formData.value = {};
}

function successHandler() {
  const toastNotification = useToastNotificationStore();
  toastNotification.addToast({
    type: "success",
    title: "Success",
    message: "Removed User successfully",
  });

  closeModal();
  emit("success");
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  console.error(errorResponse);

  const toastNotification = useToastNotificationStore();
  toastNotification.addToast({
    type: "error",
    title: "Something went wrong!",
    message: errorResponse.errors.email[0],
  });

  closeModal();
  resetForm();
}

function setData(row) {
  formData.value = { ...row };
}
</script>
