<template>
  <AlertDialog v-model:open="logoutDialogStore.visible">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to logout?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          @click="handleLogout"
          variant="destructive"
        >
          Confirm
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
import { authService } from "@/services/authService";
import { useLogoutDialogStore } from "@/store/logoutDialogStore";
import { toast } from "vue-sonner";
const logoutDialogStore = useLogoutDialogStore();

async function handleLogout() {
  await authService.logout();
  toast.success("Logged out successfully");
}
</script>
