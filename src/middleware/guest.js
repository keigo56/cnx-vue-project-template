import { useAuthStore } from "@/store/auth/authStore";

export default async function ({ to, from }) {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated()) {
    return { path: "/admin" };
  }

  return true;
}
