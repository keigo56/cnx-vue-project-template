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
import AppSidebarHeader from '@/components/navigation/sidebar/SidebarHeader.vue';
import AppSidebarContent from '@/components/navigation/sidebar/SidebarContent.vue';
import AppSidebarFooter from '@/components/navigation/sidebar/SidebarFooter.vue';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { UserPen, Shield, Home, Package } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { hasPermission } from '@/utils/permission';

const route = useRoute();

const props = defineProps({
  collapsible: {
    type: String,
    default: 'icon',
  },
});

const data = {
  content: [
    {
      groupName: 'Main',
      navLinks: [
        {
          title: 'Home',
          url: '/',
          icon: Home,
          isActive: route.path === '/',
        },
        {
          title: 'Sample Module',
          url: '#',
          icon: Package,
          isActive: route.path.includes('/module'),
          items: [
            {
              title: 'Feature 1',
              url: '/module/feature1',
            },
            {
              title: 'Feature 2',
              url: '/module/feature2',
            },
            {
              title: 'Feature 3',
              url: '/module/feature3',
            },
          ],
        },
      ],
    },
    {
      groupName: 'Maintenance',
      navLinks: [
        {
          title: 'User Management',
          url: '#',
          icon: UserPen,
          isActive: route.path.includes('/user-management'),
          isVisible:
            hasPermission('users_view') ||
            hasPermission('roles_view') ||
            hasPermission('permissions_view'),
          items: [
            {
              title: 'Users',
              url: '/user-management/users',
              isActive: route.path.includes('/user-management/users'),
              isVisible: hasPermission('users_view'),
            },
            {
              title: 'Roles',
              url: '/user-management/roles',
              isActive: route.path.includes('/user-management/roles'),
              isVisible: hasPermission('roles_view'),
            },
            {
              title: 'Permissions',
              url: '/user-management/permissions',
              isActive: route.path.includes('/user-management/permissions'),
              isVisible: hasPermission('permissions_view'),
            },
          ],
        },
        {
          title: 'Audit Trail',
          url: '#',
          icon: Shield,
          isActive: route.path.includes('/audit-trail'),
          isVisible: hasPermission('logs_view'),
          items: [
            {
              title: 'Logs',
              url: '/audit-trail/logs',
              isActive: route.path.includes('/audit-trail/logs'),
              isVisible: hasPermission('logs_view'),
            },
          ],
        },
      ],
    },
  ],
};
</script>
