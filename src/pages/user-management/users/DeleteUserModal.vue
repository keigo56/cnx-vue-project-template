<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Remove User</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to remove this user?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Form
        :data="formData"
        url="/api/users/delete"
        method="DELETE"
        id="delete_user_form"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
      >
      </Form>
      <AlertDialogFooter>
        <AlertDialogCancel @click="closeModal()">Cancel</AlertDialogCancel>
        <AlertDialogAction
          form="delete_user_form"
          type="submit"
          variant="destructive"
        >
          Remove
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ref } from "vue";
import Form from "@/components/forms/Form.vue";
import { toast } from "vue-sonner";

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
  toast.success("Success", {
    description: "Removed User successfully",
  });

  closeModal();
  emit("success");
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  console.error(errorResponse);

  toast.error("Something went wrong!", {
    description: errorResponse.errors.email[0],
  });

  closeModal();
  resetForm();
}

function setData(row) {
  formData.value = { ...row };
}
</script>
