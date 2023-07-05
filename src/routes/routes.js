import HomePage from "@/pages/homepage/HomePage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import SSOCallbackPage from "@/pages/auth/SSOCallbackPage.vue";
import IndexPage from "@/pages/IndexPage.vue";
import UsersIndexPage from "@/pages/user-management/users/UsersIndexPage.vue";
import RolesIndexPage from "@/pages/user-management/roles/RolesIndexPage.vue";
import PermissionsIndexPage from "@/pages/user-management/permissions/PermissionsIndexPage.vue";
import LogsIndexPage from "@/pages/audit-trail/logs/LogsIndexPage.vue";
import { checkHasPermission } from "@/routes/middlewares.js";

const routes = [
  {
    path: "/",
    component: IndexPage,
  },
  {
    path: "/homepage",
    component: HomePage,
  },
  {
    path: "/auth/validate",
    component: SSOCallbackPage,
  },
  {
    path: "/user-management/users",
    component: UsersIndexPage,
    beforeEnter: [checkHasPermission],
    meta: {
      middleware: "view_users",
    },
  },
  {
    path: "/user-management/roles",
    component: RolesIndexPage,
    beforeEnter: [checkHasPermission],
    meta: {
      middleware: "view_roles",
    },
  },
  {
    path: "/user-management/permissions",
    component: PermissionsIndexPage,
    beforeEnter: [checkHasPermission],
    meta: {
      middleware: "view_permissions",
    },
  },
  {
    path: "/audit-trail/logs",
    component: LogsIndexPage,
    beforeEnter: [checkHasPermission],
    meta: {
      middleware: "view_logs",
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
