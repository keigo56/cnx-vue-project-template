import axios from "axios";
import { useToastNotificationStore } from "@/store/global/toastNotificationStore.js";
import { useAuthStore } from "@/store/auth/authStore.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

/*
 * Response Interceptors
 * */
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      /*
       * If received an unauthenticated response, redirect to login page
       */
      if (error.response.status === 401) {
        let authStore = useAuthStore();
        authStore.setIsAuthenticated(false);
      }

      /*
       * If received an unauthenticated response, redirect to login page
       */
      if (error.response.status === 419) {
        let toastNotification = useToastNotificationStore();
        toastNotification.addToast({
          type: "error",
          title: "Session Expired",
          message: "Please try to login again",
        });

        let authStore = useAuthStore();
        authStore.setIsAuthenticated(false);
      }

      /*
       * If received forbidden response, redirect to login page
       */
      if (error.response.status === 403) {
        let toastNotification = useToastNotificationStore();
        toastNotification.addToast({
          type: "error",
          title: "Forbidden",
          message: "You do not have rights to perform this action",
        });
      }
    }

    if (error.code === "ERR_NETWORK") {
      let toastNotification = useToastNotificationStore();
      toastNotification.addToast({
        type: "error",
        title: "Server Unavailable",
        message: "Unable to connect to the server. Please try again.",
      });
    }

    if (error.code === "ECONNABORTED") {
      const toastNotification = useToastNotificationStore();
      toastNotification.addToast({
        type: "warning",
        title: "Something went wrong",
        message: "Server failed to respond. Please try again.",
      });
    }

    return Promise.reject(error);
  }
);
