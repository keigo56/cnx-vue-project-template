<template>
  <Dialog :open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogDescription
          >Edit an existing role in the system.</DialogDescription
        >
      </DialogHeader>
      <Form
        :data="formData"
        url="/api/datatable/roles/update"
        method="PUT"
        id="edit_role_form"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
        class="space-y-4 mb-2"
      >
        <div class="space-y-4">
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
              <Button
                variant="outline"
                @click="changeSelection()"
                type="button"
                class="text-xs"
                size="sm"
              >
                {{ allPermissionSelected ? "Unselect All" : "Select All" }}
              </Button>
            </div>

            <div class="grid grid-cols-3 gap-y-2">
              <div
                v-for="permission in permissions"
                :key="permission.id"
              >
                <CheckboxGroupRoot v-model="formData.permissions">
                  <Checkbox
                    :value="permission.id"
                    :id="`permission-${permission.id}`"
                  />

                  <label
                    :for="`permission-${permission.id}`"
                    class="ml-2 text-sm text-gray-900 dark:text-gray-300"
                  >
                    {{ permission.name }}
                  </label>
                </CheckboxGroupRoot>
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
        </div>
      </Form>

      <DialogFooter>
        <Button
          variant="outline"
          @click="closeModal()"
        >
          Cancel
        </Button>
        <Button
          form="edit_role_form"
          type="submit"
        >
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { onMounted, ref } from "vue";
import { toast } from "vue-sonner";
import Form from "@/components/forms/Form.vue";
import InputField from "@/components/forms/InputField.vue";
import { api } from "@/api/api.js";
import Button from "@/components/ui/button/Button.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroupRoot } from "reka-ui";

const isOpen = ref(false);

const formData = ref({
  id: 0,
  name: "",
  permissions: [],
});

const allPermissionSelected = ref(false);

const permissions = ref([]);

const formValidationErrors = ref({});

defineExpose({
  setData,
  openModal,
  closeModal,
});

onMounted(() => {
  getAllPermissions();
});

const emit = defineEmits(["success"]);

function getAllPermissions() {
  api.get("/api/datatable/roles/get-permissions").then((response) => {
    permissions.value = response.data.permissions;
  });
}

function getRolePermissions() {
  api
    .get(`/api/datatable/roles/${formData.value.id}/permissions`)
    .then((response) => {
      formData.value.permissions = response.data.permissions;
    });
}

function setData(row) {
  formData.value = { ...row };
  getRolePermissions();
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
    id: 0,
    name: "",
    permissions: [],
  };
  allPermissionSelected.value = false;
  formValidationErrors.value = {};
}

function successHandler() {
  toast.success("Success", {
    description: "Updated Role successfully",
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
