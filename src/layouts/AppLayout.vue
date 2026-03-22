<template>
  <SidebarProvider :default-open="defaultOpen">
    <AppSidebar />
    <SidebarInset class="overflow-x-hidden">
      <Navbar />
      <router-view />
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import Navbar from '@/components/navigation/navbar/Navbar.vue';
import AppSidebar from '@/components/navigation/sidebar/Sidebar.vue';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getCookie } from '@/utils/cookies';

const defaultOpen = getCookie('sidebar:state')
  ? getCookie('sidebar:state') === 'true'
  : true;
</script>
