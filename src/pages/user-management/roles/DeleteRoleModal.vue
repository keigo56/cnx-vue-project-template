<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this role?
        </DialogDescription>
      </DialogHeader>
      <Form
        id="delete_role_form"
        :data="formData"
        url="/api/datatable/roles/delete"
        method="DELETE"
        @on-success="successHandler"
        @on-error="errorHandler"
      />
      <DialogFooter>
        <Button
          variant="ghost"
          @click="closeModal()"
        >
          Cancel
        </Button>
        <Button
          form="delete_role_form"
          type="submit"
          variant="destructive"
        >
          Remove
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';
import Form from '@/components/forms/Form.vue';
import { toast } from 'vue-sonner';

const isOpen = ref(false);

const formData = ref({
  id: 0,
  name: '',
});

const formValidationErrors = ref({});

defineExpose({
  setData,
  openModal,
  closeModal,
});

const emit = defineEmits(['success']);

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
    name: '',
  };

  formValidationErrors.value = {};
}

function successHandler() {
  toast.success('Success', {
    description: 'Deleted Role successfully',
  });

  closeModal();
  emit('success');
  resetForm();
}

function errorHandler(error) {
  if (error.response.status === 403) {
    toast.error('Unable to perform this action', {
      description: error.response.data.message,
    });
    return;
  }

  toast.error('Something went wrong', {
    description: error.response.data.message,
  });
}
</script>
