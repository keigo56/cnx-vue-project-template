<template>
  <div class="bg-white dark:bg-dark-900 dark:text-gray-300">
    <div
      class="mx-auto min-h-screen h-full w-full max-w-md border-r dark:border-r-dark-100 p-3"
    >
      <router-link to="/">
        <div class="px-2 mb-6 flex items-center">
          <img :src="logoUrl" class="w-8 h-8" alt="" />
          <span class="ml-3 dark:text-white">Application Name</span>
        </div>
      </router-link>
      <SidebarItem :item="item" v-for="item in items" :key="item.label" />
    </div>
  </div>
</template>

<script setup>
import { UserIcon, BookOpenIcon, HomeIcon } from "@heroicons/vue/24/outline";
import logoUrl from "@/assets/logo.svg";
import { ref } from "vue";
import SidebarItem from "@/components/navigation/SidebarItem.vue";
import { useRoute } from "vue-router";
import { hasPermission } from "@/composable/checkPermission.js";

const route = useRoute();

const items = ref([
  {
    label: "Products",
    icon: HomeIcon,
    active: false,
    children: [
      {
        label: "Homepage",
        href: "/homepage",
        active: isCurrentPathActive("/homepage"),
        visible: true,
      },
      {
        label: "Page 2",
        href: "/",
        active: isCurrentPathActive("/"),
        visible: true,
      },
      {
        label: "Page 3",
        href: "/",
        active: isCurrentPathActive("/"),
        visible: true,
      },
    ],
  },
  {
    label: "Module 2",
    icon: HomeIcon,
    active: false,
    children: [
      {
        label: "Page 1",
        href: "/",
        active: false,
        visible: true,
      },
      {
        label: "Page 2",
        href: "/",
        active: false,
        visible: true,
      },
      {
        label: "Page 3",
        href: "/",
        active: false,
        visible: true,
      },
    ],
  },
  {
    label: "User Management",
    icon: UserIcon,
    active: false,
    children: [
      {
        label: "Users",
        href: "/user-management/users",
        active: isCurrentPathActive("/user-management/users"),
        visible: hasPermission("view_users"),
      },
      {
        label: "Roles",
        href: "/user-management/roles",
        active: isCurrentPathActive("/user-management/roles"),
        visible: hasPermission("view_roles"),
      },
      {
        label: "Permissions",
        href: "/user-management/permissions",
        active: isCurrentPathActive("/user-management/permissions"),
        visible: hasPermission("view_permissions"),
      },
    ],
  },
  {
    label: "Audit Trail",
    icon: BookOpenIcon,
    active: false,
    children: [
      {
        label: "Logs",
        href: "/audit-trail/logs",
        active: isCurrentPathActive("/audit-trail/logs"),
        visible: hasPermission("view_logs"),
      },
    ],
  },
]);

function isCurrentPathActive(path) {
  return route.path === path;
}
</script>
