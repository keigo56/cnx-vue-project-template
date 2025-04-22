export const authRoutes = [
  // SSO Authentication
  {
    path: "/login",
    component: () => import("@/pages/auth/SSOLoginPage.vue"),
    meta: {
      middleware: ["guest"],
    },
  },
  {
    path: "/auth/validate",
    component: () => import("@/pages/auth/SSOCallbackPage.vue"),
    meta: {
      middleware: ["guest"],
    },
  },
  //User Basic Authentication with OTP (placeholder for future implementation)
  // {
  //   path: "/user/login",
  //   component: () => import("@/pages/auth/user/UserLoginPage.vue"),
  //   meta: {
  //     middleware: ["guest"],
  //   },
  // },
];
