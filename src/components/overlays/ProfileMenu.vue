<template>
  <Menu
    as="div"
    class="relative inline-block text-left z-10"
  >
    <div>
      <MenuButton
        class="overflow-hidden border dark:border-dark-100 flex rounded-full focus:outline-none focus:ring-2 focus:ring-brand-400 dark:focus:ring-gray-700"
      >
        <img
          class="h-9 w-9"
          :src="`https://ui-avatars.com/api/?name=${userStore.user.name}&background=0D8ABC&color=fff`"
          alt=""
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 min-w-max origin-top-right divide-y divide-gray-100 dark:divide-dark-100 rounded-md bg-white dark:bg-dark-900 dark:border dark:border-dark-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-3 px-4 flex items-center space-x-4">
          <img
            class="h-12 w-12 rounded-full border dark:border-dark-100"
            :src="`https://ui-avatars.com/api/?name=${userStore.user.name}&background=0D8ABC&color=fff`"
            alt=""
          />
          <div>
            <h4 class="text-sm">{{ userStore.user.name }}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ userStore.user.position }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ userStore.user.email }}
            </p>
          </div>
        </div>
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active
                  ? 'bg-gray-100 text-gray-900 dark:text-white dark:bg-dark-100'
                  : 'text-gray-900 dark:text-gray-400',
                'group flex w-full items-center rounded-md px-5 py-2 text-sm',
              ]"
            >
              Edit profile
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click="logoutModalStore.openModal()"
              :class="[
                active
                  ? 'bg-gray-100 text-gray-900 dark:text-white dark:bg-dark-100'
                  : 'text-gray-900 dark:text-gray-400',
                'group flex w-full items-center rounded-md px-5 py-2 text-sm',
              ]"
            >
              Logout
            </button>
          </MenuItem>
        </div>
        <div class="px-1 py-1">
          <button
            class="text-gray-600 dark:text-gray-400 group focus:outline-none flex w-full items-center rounded-md px-5 py-2 text-sm"
          >
            <span class="flex w-full justify-between">
              <span>Dark Mode</span>
              <Switch
                v-model="isDarkMode"
                :class="
                  isDarkMode ? 'bg-brand-400 dark:bg-zinc-700' : 'bg-brand-200'
                "
                class="relative inline-flex h-[24px] w-[42px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <span class="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  :class="isDarkMode ? 'translate-x-[18px]' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
              </Switch>
            </span>
          </button>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem, Switch } from "@headlessui/vue";
import { useUserStore } from "@/store/auth/userStore.js";
import { onMounted, ref, watch } from "vue";
import { useThemeStore } from "@/store/global/themeStore.js";
import { useLogoutModalStore } from "@/store/auth/logoutModalStore.js";

const userStore = useUserStore();
const themeStore = useThemeStore();
const logoutModalStore = useLogoutModalStore();
const isDarkMode = ref(false);

watch(isDarkMode, () => {
  const theme = isDarkMode.value === true ? "dark" : "light";
  themeStore.setTheme(theme);
});
onMounted(() => {
  isDarkMode.value = themeStore.theme === "dark";
});
</script>
