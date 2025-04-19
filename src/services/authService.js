import { api } from "@/api/api";
import { useAuthStore } from "@/store/auth/authStore";
import router from "@/router/router.js";

async function initializeAuth() {
  await fetchUser();
}

async function fetchUser() {
  try {
    const { data } = await api.get("/api/user");
    const authStore = useAuthStore();
    authStore.setData(data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

async function validateToken(token) {
  try {
    await api.get("sanctum/csrf-cookie");
    await api.post(
      "/admin/auth/token/validate",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    await fetchUser();
  } catch (error) {
    console.error("Error validating token:", error);
  }
}

async function logout() {
  try {
    await api.delete("/admin/auth/logout");
    const authStore = useAuthStore();
    authStore.reset();
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

async function frontendLogout() {
  const authStore = useAuthStore();
  authStore.reset();

  router.push({ path: "/admin/login" });
}

export { initializeAuth, fetchUser, validateToken, logout, frontendLogout };
