import { useAuthStore } from "@/store/authStore";

export function hasPermission(permission) {
  const authStore = useAuthStore();
  return authStore.hasPermission(permission);
}
