import { useUserStore } from "@/store/auth/userStore.js";

export function hasPermission(permission) {
  const userStore = useUserStore();
  return userStore.permissions.includes(permission);
}
