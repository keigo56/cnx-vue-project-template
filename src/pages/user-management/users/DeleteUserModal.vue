<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Remove User</DialogTitle>
        <DialogDescription>
          Are you sure you want to remove this user?
        </DialogDescription>
      </DialogHeader>
      <Form
        id="delete_user_form"
        :data="formData"
        url="/api/users/delete"
        method="DELETE"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
      />
      <DialogFooter>
        <Button
          variant="ghost"
          @click="closeModal()"
        >
          Cancel
        </Button>
        <Button
          form="delete_user_form"
          type="submit"
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

const formData = ref({});

defineExpose({
  openModal,
  closeModal,
  setData,
});

const emit = defineEmits(['success']);

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
  toast.success('Success', {
    description: 'Removed User successfully',
  });

  closeModal();
  emit('success');
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  console.error(errorResponse);

  toast.error('Something went wrong!', {
    description: errorResponse.errors.email[0],
  });

  closeModal();
  resetForm();
}

function setData(row) {
  formData.value = { ...row };
}
</script>
