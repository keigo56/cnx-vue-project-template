<template>
  <template
    v-for="group in content"
    :key="group.groupName"
  >
    <SidebarGroup>
      <SidebarGroupLabel>{{ group.groupName }}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <template
            v-for="item in group.navLinks"
            :key="item.title"
          >
            <!-- If navLink has no sub-items -->
            <SidebarMenuItem v-if="!item.items">
              <SidebarMenuButton
                as-child
                :tooltip="item.title"
                :isActive="item.isActive"
              >
                <router-link :to="item.url">
                  <component
                    :is="item.icon"
                    v-if="item.icon"
                  />
                  <span>{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <!-- If navLink has sub-items -->
            <Collapsible
              v-else
              as-child
              :default-open="item.isActive"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component
                      :is="item.icon"
                      v-if="item.icon"
                    />
                    <span>{{ item.title }}</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton
                        as-child
                        :isActive="subItem.isActive"
                      >
                        <router-link :to="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </router-link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </template>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </template>
</template>

<script setup>
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-vue-next";

defineProps({
  content: {
    type: Array,
    required: true,
  },
});
</script>
