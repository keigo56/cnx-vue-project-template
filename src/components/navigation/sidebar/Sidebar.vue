<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <AppSidebarHeader />
    </SidebarHeader>
    <SidebarContent>
      <AppSidebarContent :content="data.content" />
    </SidebarContent>
    <SidebarFooter>
      <AppSidebarFooter />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script setup>
import AppSidebarHeader from "@/components/navigation/sidebar/SidebarHeader.vue";
import AppSidebarContent from "@/components/navigation/sidebar/SidebarContent.vue";
import AppSidebarFooter from "@/components/navigation/sidebar/SidebarFooter.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserPen, Shield, Home, Package } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { hasPermission } from "@/utils/permission";

const route = useRoute();

const props = defineProps({
  collapsible: {
    type: String,
    default: "icon",
  },
});

const data = {
  content: [
    {
      groupName: "Main",
      navLinks: [
        {
          title: "Home",
          url: "/admin/",
          icon: Home,
          isActive: route.path === "/admin/",
        },
        {
          title: "Sample Module",
          url: "#",
          icon: Package,
          isActive: route.path.includes("/admin/module"),
          items: [
            {
              title: "Feature 1",
              url: "/admin/module/feature1",
            },
            {
              title: "Feature 2",
              url: "/admin/module/feature2",
            },
            {
              title: "Feature 3",
              url: "/admin/module/feature3",
            },
          ],
        },
      ],
    },
    {
      groupName: "Maintenance",
      navLinks: [
        {
          title: "User Management",
          url: "#",
          icon: UserPen,
          isActive: route.path.includes("/admin/user-management"),
          isVisible:
            hasPermission("view_users") ||
            hasPermission("view_roles") ||
            hasPermission("view_permissions"),
          items: [
            {
              title: "Users",
              url: "/admin/user-management/users",
              isActive: route.path.includes("/admin/user-management/users"),
              isVisible: hasPermission("view_users"),
            },
            {
              title: "Roles",
              url: "/admin/user-management/roles",
              isActive: route.path.includes("/admin/user-management/roles"),
              isVisible: hasPermission("view_roles"),
            },
            {
              title: "Permissions",
              url: "/admin/user-management/permissions",
              isActive: route.path.includes(
                "/admin/user-management/permissions",
              ),
              isVisible: hasPermission("view_permissions"),
            },
          ],
        },
        {
          title: "Audit Trail",
          url: "#",
          icon: Shield,
          isActive: route.path.includes("/admin/audit-trail"),
          isVisible: hasPermission("view_logs"),
          items: [
            {
              title: "Logs",
              url: "/admin/audit-trail/logs",
              isActive: route.path.includes("/admin/audit-trail/logs"),
              isVisible: hasPermission("view_logs"),
            },
          ],
        },
      ],
    },
  ],
};
</script>
