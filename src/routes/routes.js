import HomePage from "@/pages/homepage/HomePage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import SSOCallbackPage from "@/pages/auth/SSOCallbackPage.vue";
import IndexPage from "@/pages/IndexPage.vue";
import UsersIndexPage from "@/pages/user-management/users/UsersIndexPage.vue";
import RolesIndexPage from "@/pages/user-management/roles/RolesIndexPage.vue";
import PermissionsIndexPage from "@/pages/user-management/permissions/PermissionsIndexPage.vue";
import LogsIndexPage from "@/pages/audit-trail/logs/LogsIndexPage.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";

const routes = [
  {
    path: "/login",
    component: LoginPage,
    meta: {
      middleware: ["guest"],
    },
  },
  {
    path: "/auth/validate",
    component: SSOCallbackPage,
    meta: {
      middleware: ["guest"],
    },
  },
  {
    path: "/",
    component: IndexPage,
    meta: {
      middleware: ["auth"],
    },
  },
  {
    path: "/homepage",
    component: HomePage,
    meta: {
      middleware: ["auth"],
    },
  },
  {
    path: "/user-management/users",
    component: UsersIndexPage,
    meta: {
      middleware: ["auth", "can:view_users"],
    },
  },
  {
    path: "/user-management/roles",
    component: RolesIndexPage,
    meta: {
      middleware: ["auth", "can:view_roles"],
    },
  },
  {
    path: "/user-management/permissions",
    component: PermissionsIndexPage,
    meta: {
      middleware: ["auth", "can:view_permissions"],
    },
  },
  {
    path: "/audit-trail/logs",
    component: LogsIndexPage,
    meta: {
      middleware: ["auth", "can:view_logs"],
    },
  },
  /*
   * This Page will be rendered if a user entered a non-existing route
   * */
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },
];

export default routes;
