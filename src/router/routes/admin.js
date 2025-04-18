import UsersIndexPage from "@/pages/admin/user-management/users/UsersIndexPage.vue";
import RolesIndexPage from "@/pages/admin/user-management/roles/RolesIndexPage.vue";
import PermissionsIndexPage from "@/pages/admin/user-management/permissions/PermissionsIndexPage.vue";
import IndexPage from "@/pages/admin/IndexPage.vue";
import LogsIndexPage from "@/pages/admin/audit-trail/logs/LogsIndexPage.vue";

export const adminRoutes = [
  {
    path: "/admin",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: {
      middleware: ["auth"],
    },
    children: [
      {
        path: "",
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
