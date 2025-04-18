<template>
  <SidebarProvider :defaultOpen="defaultOpen">
    <AppSidebar />
    <SidebarInset>
      <Navbar />
      <main class="overflow-auto max-h-screen pb-20">
        <router-view></router-view>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import Navbar from "@/components/navigation/navbar/Navbar.vue";
import AppSidebar from "@/components/navigation/sidebar/Sidebar.vue";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCookie } from "@/utils/cookies";

const defaultOpen = getCookie("sidebar:state")
  ? getCookie("sidebar:state") === "true"
  : true;
</script>
