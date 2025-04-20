<template>
  <BaseModal
    title="Add User"
    :is-open="isOpen"
    width="40rem"
  >
    <div class="my-8">
      <Form
        :data="formData"
        url="/api/users/store"
        method="POST"
        id="add_user_form"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
      >
        <ComboBoxField
          source-url="/api/users/employee/search"
          placeholder="Select Email"
          id="user_email"
          v-model="formData.email"
          label="Email"
          :error="formValidationErrors.email"
        />

        <SelectField
          placeholder="Select Role"
          :items="roles"
          id="role_id"
          v-model="formData.role_id"
          label="Role"
          :error="formValidationErrors.role_id"
        />
      </Form>
    </div>

    <div class="mt-4 flex space-x-2">
      <button
        form="add_user_form"
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-brand-800 text-gray-100 dark:text-white px-4 py-2 text-sm font-medium dark:hover:bg-brand-700 hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Submit
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
import Form from "@/components/forms/Form.vue";
import { api } from "@/api/api.js";
import SelectField from "@/components/forms/SelectField.vue";
import ComboBoxField from "@/components/forms/ComboBoxField.vue";
import { toast } from "vue-sonner";
const isOpen = ref(false);

const formData = ref({});

const roles = ref([]);

const formValidationErrors = ref({});

onMounted(() => {
  getAllRoles();
});

defineExpose({
  openModal,
  closeModal,
});

const emit = defineEmits(["success"]);

function getAllRoles() {
  api.get("/api/users/roles").then((response) => {
    roles.value = response.data.roles.map((item) => {
      return { value: item.id, label: item.name };
    });
  });
}

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  resetForm();
  isOpen.value = false;
}

function resetForm() {
  formData.value = {};

  formValidationErrors.value = {};
}

function successHandler() {
  toast.success("Success", {
    description: "Added User successfully",
  });

  closeModal();
  emit("success");
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  formValidationErrors.value = errorResponse.errors;
}
</script>
