<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
        size="lg"
        as-child
      >
        <a href="#">
          <div
            class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
          >
            <img
              src="/vite.svg"
              class="size-4"
              alt="Application Logo"
            />
          </div>
          <div class="flex flex-col gap-0.5 leading-none">
            <span class="font-semibold">Application Name</span>
            <span class="text-xs">v1.0.0</span>
          </div>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
<script setup>
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
</script>
