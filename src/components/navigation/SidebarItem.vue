<template>
  <Disclosure
    :default-open="hasActiveChildren"
    v-slot="{ open }"
    v-if="props.item.children.some((item) => item.visible)"
  >
    <DisclosureButton
      class="flex w-full justify-between rounded px-4 py-2 text-left text-sm font-medium text-brand-900 dark:text-white hover:bg-brand-200 dark:hover:bg-dark-100 focus:outline-none focus-visible:ring focus-visible:ring-brand-500 focus-visible:ring-opacity-75"
    >
      <div class="flex">
        <component :is="props.item.icon" class="w-5 h-5 mr-3" />
        <span>{{ props.item.label }}</span>
      </div>
      <ChevronUpIcon
        :class="open ? 'rotate-180 transform' : ''"
        class="h-5 w-5 text-brand-500"
      />
    </DisclosureButton>
    <DisclosurePanel class="mt-2 text-sm text-gray-700 dark:text-gray-400">
      <div
        v-for="child in props.item.children"
        :key="child.label"
        class="flex flex-col space-y-1"
      >
        <router-link
          v-if="child.visible"
          :to="child.href"
          :class="
            child.active ? 'bg-brand-100 dark:bg-dark-100 dark:text-white' : ''
          "
          class="hover:bg-brand-100 dark:hover:bg-dark-100 px-3 pl-6 py-2 text-left rounded"
        >
          {{ child.label }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { computed } from "vue";

const hasActiveChildren = computed(() =>
  props.item.children.some((item) => item.active)
);

const props = defineProps({
  item: {
    type: Object,
    default: {
      label: "Module 1",
      active: false,
      children: [
        {
          label: "Page 1",
          href: "/",
          active: false,
          visible: true,
        },
      ],
    },
  },
});
</script>
