<template>
  <Dialog :open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add User</DialogTitle>
        <DialogDescription> Add a new user to the system. </DialogDescription>
      </DialogHeader>
      <Form
        id="add_user_form"
        :data="formData"
        url="/api/users/store"
        method="POST"
        class="space-y-4 mb-2"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
      >
        <div class="space-y-4">
          <ComboBoxField
            id="user_email"
            v-model="formData.email"
            placeholder="Select Email"
            label="Email"
            :error="formValidationErrors.email"
            :items="employees"
            :loading="isSearching"
            @search="searchEmployees"
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
          form="add_user_form"
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
const employees = ref([]);
const roles = ref([]);
const formValidationErrors = ref({});
const isSearching = ref(false);

defineExpose({
  openModal,
  closeModal,
});

const emit = defineEmits(['success']);

function getAllRoles() {
  api.get('/api/users/roles').then((response) => {
    roles.value = response.data.roles.map((item) => {
      return { value: item.id, label: item.name };
    });
  });
}

async function searchEmployees(query) {
  isSearching.value = true;
  try {
    const response = await api.get('/api/users/employee/search', {
      params: { query },
    });
    employees.value = response.data.result;
  } finally {
    isSearching.value = false;
  }
}

function openModal() {
  isOpen.value = true;
  getAllRoles();
  getAllSites();
  searchEmployees('');
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
  toast.success('Success', {
    description: 'Added User successfully',
  });

  closeModal();
  emit('success');
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  formValidationErrors.value = errorResponse.errors;
}
</script>
