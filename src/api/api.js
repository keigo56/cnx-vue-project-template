import axios from "axios";
import { toast } from "vue-sonner";
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
          toast.error("Session Expired", {
            description: "Please try to login again",
          });

          frontendLogout();
        }

        /*
         * If received forbidden response, redirect to login page
         */
        if (error.response.status === 403) {
          toast.error("Forbidden", {
            description: "You do not have rights to perform this action",
          });
        }
      }

      if (error.code === "ERR_NETWORK") {
        toast.error("Server Unavailable", {
          description: "Unable to connect to the server. Please try again.",
        });
      }

      if (error.code === "ECONNABORTED") {
        toast.warning("Request Timeout", {
          description:
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
