<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage
                :src="userAvatar"
                :alt="user.name"
              />
              <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage
                  :src="userAvatar"
                  :alt="user.name"
                />
                <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
                <span class="truncate text-xs">{{ user.position }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span class="w-full">Dark Mode</span>
              <Switch
                v-model="isDarkMode"
                @click.stop
              >
              </Switch>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            @click="logoutDialogStore.show()"
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useThemeStore } from "@/store/global/themeStore";
import { ChevronsUpDown, LogOut } from "lucide-vue-next";
import { useLogoutDialogStore } from "@/store/auth/logoutDialogStore";
import { useAuthStore } from "@/store/auth/authStore";

const { isMobile } = useSidebar();

const authStore = useAuthStore();
const user = authStore.user;
const userAvatar = `https://ui-avatars.com/api/?name=${user.name}&background=003d5b&color=FFFFFF`;

const themeStore = useThemeStore();
const isDarkMode = ref(false);

watch(isDarkMode, () => {
  const theme = isDarkMode.value === true ? "dark" : "light";
  themeStore.setTheme(theme);
});
onMounted(() => {
  isDarkMode.value = themeStore.theme === "dark";
});

const logoutDialogStore = useLogoutDialogStore();
</script>
