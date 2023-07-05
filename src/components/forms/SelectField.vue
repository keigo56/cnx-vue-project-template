<template>
  <div class="my-5">
    <label
      :for="props.id"
      :class="[
        props.error.length > 0
          ? 'block mb-2 text-sm font-medium text-red-900 dark:text-red-400'
          : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
      ]"
    >
      {{ props.label }}
    </label>
    <Listbox
      :model-value="props.modelValue"
      @update:model-value="(value) => emit('update:modelValue', value)"
    >
      <div class="relative mt-1">
        <ListboxButton
          :class="[
            props.error.length > 0
              ? 'relative w-full cursor-pointer rounded-md bg-white dark:bg-dark-100 dark:text-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6'
              : 'relative w-full cursor-pointer rounded-md bg-white dark:bg-dark-100 dark:text-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6',
          ]"
        >
          <span class="block truncate" v-if="props.modelValue">
            {{ label }}
          </span>
          <span class="block truncate" v-else>{{ props.placeholder }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-neutral-900 dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="item in props.items"
              :key="item.value"
              :value="item.value"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-800'
                    : 'text-gray-900 dark:text-white dark:hover:bg-neutral-800',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ item.label }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-white"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <p
      v-show="props.error"
      class="mt-1 text-xs text-red-600 dark:text-red-500 font-semibold"
    >
      {{ props.error[0] }}
    </p>
  </div>
</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: [],
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  error: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: "Form Label",
    required: true,
  },
  modelValue: {
    type: [String, Number],
  },
  placeholder: {
    type: String,
    default: "Select item...",
  },
});

const label = computed(() => {
  return props.items.find((item) => item.value === props.modelValue)?.label;
});

const emit = defineEmits(["update:modelValue"]);
</script>
