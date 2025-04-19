import { useAuthStore } from "@/store/authStore";

export default function ({ to, from }, permission) {
  const authStore = useAuthStore();

  if (!authStore.hasPermission(permission)) {
    return { path: "/admin/" };
  }

  return true;
}
