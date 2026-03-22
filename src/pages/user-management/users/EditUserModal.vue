<template>
  <Dialog :open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        <DialogDescription>
          Edit an existing user in the system.
        </DialogDescription>
      </DialogHeader>
      <Form
        id="edit_user_form"
        :data="formData"
        url="/api/users/update"
        method="PUT"
        class="space-y-4 mb-2"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
      >
        <div class="space-y-4">
          <ComboBoxField
            id="user_email"
            v-model="formData.email"
            source-url="/api/users/employee/search"
            placeholder="Select Email"
            label="Email"
            :error="formValidationErrors.email"
            :items="employees"
            disabled
          />

          <SelectField
            id="role_id"
            v-model="formData.role_id"
            placeholder="Select Role"
            :items="roles"
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
} from '@/components/ui/dialog';
import { ref } from 'vue';
import Form from '@/components/forms/Form.vue';
import { api } from '@/api/api.js';
import SelectField from '@/components/forms/SelectField.vue';
import ComboBoxField from '@/components/forms/ComboBoxField.vue';
import { toast } from 'vue-sonner';
import Button from '@/components/ui/button/Button.vue';

const isOpen = ref(false);
const formData = ref({});
const roles = ref([]);
const formValidationErrors = ref({});
const employees = ref([]);

defineExpose({
  openModal,
  closeModal,
  setData,
});

const emit = defineEmits(['success']);

function getAllRoles() {
  api.get('/api/users/roles').then((response) => {
    roles.value = response.data.roles.map((item) => {
      return { value: item.id, label: item.name };
    });
  });
}

function openModal() {
  isOpen.value = true;
  getAllRoles();
  getAllSites();
}

function closeModal() {
  resetForm();
  isOpen.value = false;
}

function resetForm() {
  formData.value = {};
  formValidationErrors.value = {};
  employees.value = [];
}

function successHandler() {
  toast.success('Success', {
    description: 'Updated User successfully',
  });

  closeModal();
  emit('success');
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  formValidationErrors.value = errorResponse.errors;
}

function setData(row) {
  formData.value = { ...row };

  employees.value = [
    {
      value: formData.value.email,
      label: formData.value.email,
    },
  ];
}
</script>
