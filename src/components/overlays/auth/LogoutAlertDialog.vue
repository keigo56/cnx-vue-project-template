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
          @click="logoutHandler"
          variant="destructive"
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup>
import { useRouter } from "vue-router";
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
import { logout } from "@/services/authService";
import { useLogoutDialogStore } from "@/store/auth/logoutDialogStore";

const router = useRouter();

const logoutDialogStore = useLogoutDialogStore();

async function logoutHandler() {
  await logout();
  router.push({ path: "/admin/login" });
}
</script>
