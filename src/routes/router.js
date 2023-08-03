import routes from "@/routes/routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/auth/userStore.js";
import { useAuthStore } from "@/store/auth/authStore.js";

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const middlewaresMapping = {
  guest: async () => {
    const userStore = useUserStore();
    await userStore.getUser();

    let authStore = useAuthStore();
    return authStore.isAuthenticated === false;
  },
  auth: async () => {
    const userStore = useUserStore();
    await userStore.getUser();

    let authStore = useAuthStore();
    return authStore.isAuthenticated;
  },
  can: async (permission) => {
    const userStore = useUserStore();
    return userStore.permissions.includes(permission);
  },
};

/*
 * This function runs on every before route traversal
 * */
router.beforeEach(async (to, from, next) => {
  let middlewares = to.meta.middleware;

  if (middlewares === undefined) {
    return next();
  }

  for (let i = 0; i < middlewares.length; i++) {
    let middleware = middlewares[i];

    let isPermission = middleware.includes("can:");
    let permission = isPermission ? middleware.replace("can:", "") : "";

    middleware = isPermission ? "can" : middleware;

    switch (middleware) {
      case "guest":
        let isGuest = await middlewaresMapping["guest"]();
        if (isGuest === false) {
          return next({ path: "/" });
        }
        break;
      case "auth":
        if (!(await middlewaresMapping["auth"]())) {
          return next({ path: "/login" });
        }
        break;
      case "can":
        if (!(await middlewaresMapping["can"](permission))) {
          return next({ path: "/" });
        }
        break;
    }
  }
  return next();
});

export default router;
