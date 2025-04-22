import { useAuthStore } from "@/store/authStore";

export default async function ({ to, from }) {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated()) {
    return { path: "/home" };
  }

  return true;
}
