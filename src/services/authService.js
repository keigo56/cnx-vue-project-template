import { api, removeInterceptors, setupInterceptors } from "@/api/api";
import { toast } from "vue-sonner";
import { useAuthStore } from "@/store/authStore";
import router from "@/router/router.js";

class AuthService {
  constructor() {
    this.ENDPOINTS = {
      VALIDATE_TOKEN: "/admin/auth/token/validate",
      LOGOUT: "/admin/auth/logout",
      USER: "/api/user",
      CSRF: "sanctum/csrf-cookie",
    };
  }

  async initialize() {
    try {
      await this.fetchUser();
    } catch (error) {
      console.error("Authentication initialization error:", error);
    }
  }

  async fetchUser() {
    try {
      removeInterceptors();
      const { data } = await api.get(this.ENDPOINTS.USER);
      const authStore = useAuthStore();
      authStore.setData(data);
      return data;
    } catch (error) {
      if (!(error.response?.status === 401)) {
        console.error("User fetch error:", error);
        const authStore = useAuthStore();
        authStore.error = error;
      }
    } finally {
      setupInterceptors();
    }
  }

  async validateToken(token) {
    if (!token || typeof token !== "string") {
      console.error("Invalid token provided");
      return;
    }

    try {
      await api.get(this.ENDPOINTS.CSRF);
      await api.post(
        this.ENDPOINTS.VALIDATE_TOKEN,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      return await this.fetchUser();
    } catch (error) {
      console.error("Token validation error:", error);
    }
  }

  async logout() {
    try {
      await api.delete(this.ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await this.clearAuthState();
    }
  }

  async clearAuthState() {
    const authStore = useAuthStore();
    authStore.reset();
    router.push({ path: "/admin/login" });
  }
}

export const authService = new AuthService();
