export const authRoutes = [
  // Admin Authentication
  {
    path: "/admin/login",
    component: () => import("@/pages/auth/admin/AdminLoginPage.vue"),
    meta: {
      middleware: ["guest"],
    },
  },
  {
    path: "/admin/auth/validate",
    component: () => import("@/pages/auth/admin/AdminSSOCallbackPage.vue"),
    meta: {
      middleware: ["guest"],
    },
  },
  //User Authentication (placeholder for future implementation)
  {
    path: "/user/login",
    component: () => import("@/pages/auth/user/UserLoginPage.vue"),
    meta: {
      middleware: ["guest"],
    },
  },
];
