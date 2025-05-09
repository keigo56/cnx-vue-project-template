import { useAuthStore } from "@/store/authStore";

export default async function ({ to, from }, role) {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated()) {
    return { path: "/" };
  }

  return true;
}
