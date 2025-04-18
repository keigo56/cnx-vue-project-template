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
          @click="authStore.logout()"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/auth/authStore.js";
import { useLogoutDialogStore } from "@/store/auth/logoutDialogStore";

const authStore = useAuthStore();
const logoutDialogStore = useLogoutDialogStore();
</script>
