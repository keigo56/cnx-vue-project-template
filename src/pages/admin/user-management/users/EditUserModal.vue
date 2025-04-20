<template>
  <Dialog :open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        <DialogDescription
          >Edit an existing user in the system.</DialogDescription
        >
      </DialogHeader>
      <Form
        :data="formData"
        url="/api/users/update"
        method="PUT"
        id="edit_user_form"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
        class="space-y-4 mb-2"
      >
        <div class="space-y-4">
          <ComboBoxField
            source-url="/api/users/employee/search"
            placeholder="Select Email"
            id="user_email"
            v-model="formData.email"
            label="Email"
            :error="formValidationErrors.email"
            disabled
          />

          <SelectField
            placeholder="Select Role"
            :items="roles"
            id="role_id"
            v-model="formData.role_id"
            label="Role"
            :error="formValidationErrors.role_id"
          />
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
          form="edit_user_form"
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
import Form from "@/components/forms/Form.vue";
import { api } from "@/api/api.js";
import SelectField from "@/components/forms/SelectField.vue";
import ComboBoxField from "@/components/forms/ComboBoxField.vue";
import { toast } from "vue-sonner";
import Button from "@/components/ui/button/Button.vue";

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
  setData,
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
    description: "Updated User successfully",
  });

  closeModal();
  emit("success");
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  formValidationErrors.value = errorResponse.errors;
}

function setData(row) {
  formData.value = { ...row };
}
</script>
