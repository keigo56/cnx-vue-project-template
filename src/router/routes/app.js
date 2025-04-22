import UsersIndexPage from "@/pages/user-management/users/UsersIndexPage.vue";
import RolesIndexPage from "@/pages/user-management/roles/RolesIndexPage.vue";
import PermissionsIndexPage from "@/pages/user-management/permissions/PermissionsIndexPage.vue";
import LogsIndexPage from "@/pages/audit-trail/logs/LogsIndexPage.vue";
import IndexPage from "@/pages/IndexPage.vue";

export const appRoutes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "home",
        component: IndexPage,
        meta: {
          middleware: ["auth"],
          breadcrumb: ["Home"],
        },
      },
      {
        path: "user-management/users",
        component: UsersIndexPage,
        meta: {
          middleware: ["auth", "can:view_users"],
          breadcrumb: ["User Management", "Users"],
        },
      },
      {
        path: "user-management/roles",
        component: RolesIndexPage,
        meta: {
          middleware: ["auth", "can:view_roles"],
          breadcrumb: ["User Management", "Roles"],
        },
      },
      {
        path: "user-management/permissions",
        component: PermissionsIndexPage,
        meta: {
          middleware: ["auth", "can:view_permissions"],
          breadcrumb: ["User Management", "Permissions"],
        },
      },
      {
        path: "audit-trail/logs",
        component: LogsIndexPage,
        meta: {
          middleware: ["auth", "can:view_logs"],
          breadcrumb: ["Audit Trail", "Logs"],
        },
      },
    ],
  },
];
