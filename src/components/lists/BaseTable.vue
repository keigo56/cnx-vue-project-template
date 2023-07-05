<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th v-for="column in props.columns" :key="column" scope="col" class="px-6 py-3">
        {{ column }}
      </th>

      <th v-if="props.hasActionItem === true && props.data.length !== 0"> Actions </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in props.data" :key="row.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td v-for="key in Object.keys(props.columns)" :key="key" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {{ row[key] }}
      </td>
      <td v-if="props.hasActionItem === true && props.data.length !== 0">
        <div class="w-56 relative">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                  class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Options
                <ChevronDownIcon
                    class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
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
                  class="z-50 absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-for="action in props.actions" :key="action.label" v-slot="{ active }">
                    <button
                        @click="$emit(action.action, row.id)"
                        :class="[
                        active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      {{ action.label }}
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    columns: {
      type: Object,
      default: []
    },
    data: {
      type: [Array, Object],
      default: []
    },
    actions: {
      type: Array,
      default: []
    },
    hasActionItem : {
      type: Boolean,
      default: false
    }
})
</script>
