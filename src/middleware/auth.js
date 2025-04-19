import { useAuthStore } from "@/store/auth/authStore";

export default async function ({ to, from }, role) {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated()) {
    return { path: "/admin/login" };
  }

  return true;
}
