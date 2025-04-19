<template>
  <BaseModal
    title="Add Role"
    :is-open="isOpen"
    width="40rem"
  >
    <div class="my-5">
      <Form
        :data="formData"
        url="/api/datatable/roles/add"
        method="POST"
        id="add_role_form"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
      >
        <InputField
          id="role_name"
          type="text"
          v-model="formData.name"
          label="Role Name"
          :error="formValidationErrors.name"
        />

        <div class="mb-10">
          <div class="flex justify-between items-center border-b mb-3 pb-2">
            <label
              :class="[
                !!formValidationErrors.permissions
                  ? 'block mb-2 text-sm font-medium text-red-900 dark:text-red-400'
                  : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
              ]"
            >
              Permissions
            </label>
            <button
              @click="changeSelection()"
              type="button"
              class="px-3 py-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {{ allPermissionSelected ? "Unselect All" : "Select All" }}
            </button>
          </div>

          <div class="grid grid-cols-3 gap-y-2">
            <div
              v-for="permission in permissions"
              :key="permission.id"
            >
              <input
                v-model="formData.permissions"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                :value="permission.id"
                :id="`permission-${permission.id}`"
              />
              <label
                :for="`permission-${permission.id}`"
                class="ml-2 text-sm text-gray-900 dark:text-gray-300"
              >
                {{ permission.name }}
              </label>
            </div>
          </div>
          <p
            v-show="!!formValidationErrors.permissions"
            class="mt-4 text-xs text-red-600 dark:text-red-500 font-semibold"
          >
            {{
              !!formValidationErrors?.permissions
                ? formValidationErrors.permissions[0]
                : ""
            }}
          </p>
        </div>
      </Form>
    </div>

    <div class="mt-4 flex space-x-2">
      <button
        form="add_role_form"
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
import { useToastNotificationStore } from "@/store/toastNotificationStore.js";
import Form from "@/components/forms/Form.vue";
import InputField from "@/components/forms/InputField.vue";
import CheckboxField from "@/components/forms/CheckboxField.vue";
import { api } from "@/api/api.js";

const isOpen = ref(false);

const formData = ref({
  name: "",
  permissions: [],
});

const allPermissionSelected = ref(false);

const permissions = ref([]);

const formValidationErrors = ref({});

onMounted(() => {
  getAllPermissions();
});

defineExpose({
  openModal,
  closeModal,
});

const emit = defineEmits(["success"]);

function getAllPermissions() {
  api.get("/api/datatable/roles/get-permissions").then((response) => {
    permissions.value = response.data.permissions;
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
  formData.value = {
    name: "",
    permissions: [],
  };

  allPermissionSelected.value = false;
  formValidationErrors.value = {};
}

function successHandler() {
  const toastNotification = useToastNotificationStore();
  toastNotification.addToast({
    type: "success",
    title: "Success",
    message: "Added Role successfully",
  });

  closeModal();
  emit("success");
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  formValidationErrors.value = errorResponse.errors;
}

function changeSelection() {
  if (allPermissionSelected.value === false) {
    formData.value.permissions = permissions.value.map((item) => item.id);
    allPermissionSelected.value = true;
  } else {
    formData.value.permissions = [];
    allPermissionSelected.value = false;
  }
}
</script>
