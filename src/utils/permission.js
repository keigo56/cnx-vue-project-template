import { useAuthStore } from "@/store/auth/authStore";

export function hasPermission(permission) {
  const authStore = useAuthStore();
  return authStore.hasPermission(permission);
}
