<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Role</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this role?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Form
        :data="formData"
        url="/api/datatable/roles/delete"
        method="DELETE"
        id="delete_role_form"
        @on-success="successHandler"
      >
      </Form>
      <AlertDialogFooter>
        <AlertDialogCancel @click="closeModal()">Cancel</AlertDialogCancel>
        <AlertDialogAction
          form="delete_role_form"
          type="submit"
          variant="destructive"
        >
          Delete
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

const formData = ref({
  id: 0,
  name: "",
});

const formValidationErrors = ref({});

defineExpose({
  setData,
  openModal,
  closeModal,
});

const emit = defineEmits(["success"]);

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
    name: "",
  };

  formValidationErrors.value = {};
}

function successHandler() {
  toast.success("Success", {
    description: "Deleted Role successfully",
  });

  closeModal();
  emit("success");
  resetForm();
}
</script>
