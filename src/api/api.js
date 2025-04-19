import axios from "axios";
import { useToastNotificationStore } from "@/store/global/toastNotificationStore.js";
import { frontendLogout } from "@/services/authService.js";

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

let responseInterceptor = null;

export const setupInterceptors = () => {
  if (responseInterceptor) {
    api.interceptors.response.eject(responseInterceptor);
  }

  responseInterceptor = api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        let toastNotification = useToastNotificationStore();

        /*
         * If received an unauthenticated response, redirect to login page
         */
        if (error.response.status === 401) {
          toastNotification.addToast({
            type: "error",
            title: "You are not authenticated",
            message: "Please try to login again",
          });

          frontendLogout();
        }

        /*
         * If received an unauthenticated response, redirect to login page
         */
        if (error.response.status === 419) {
          toastNotification.addToast({
            type: "error",
            title: "Session Expired",
            message: "Please try to login again",
          });

          frontendLogout();
        }

        /*
         * If received forbidden response, redirect to login page
         */
        if (error.response.status === 403) {
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
          title: "Request Timeout",
          message:
            "The request took too long to process and was aborted. Please check your network connection and try again.",
        });
      }

      return Promise.reject(error);
    },
  );
};

export const removeInterceptors = () => {
  if (responseInterceptor) {
    api.interceptors.response.eject(responseInterceptor);
    responseInterceptor = null;
  }
};
