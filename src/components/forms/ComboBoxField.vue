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
      :disabled="disabled"
      :model-value="props.modelValue"
      @update:model-value="(value) => emit('update:modelValue', value)"
    >
      <div class="relative mt-1">
        <ListboxButton
          :class="[
            props.error.length > 0
              ? 'relative w-full cursor-pointer rounded-md bg-white dark:bg-dark-100 dark:text-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 focus:outline-none focus:ring-2 dark:ring-red-700 focus:ring-red-500 sm:text-sm sm:leading-6'
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
            <div class="py-2 px-4 w-full">
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  v-model="searchString"
                  type="search"
                  class="block w-full px-2 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-900 dark:border-neutral-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>
            </div>
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="item in items"
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
import { computed, onMounted, ref, watch } from "vue";
import { watchDebounced } from "@vueuse/core";
import { api } from "@/api/api.js";

const props = defineProps({
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
  sourceUrl: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const label = computed(() => {
  let label = items.value.find(
    (item) => item.value === props.modelValue
  )?.label;
  return label ?? props.modelValue;
});

const emit = defineEmits(["update:modelValue"]);

const searchString = ref("");
const items = ref([]);

onMounted(() => {
  fetchData();
});

watchDebounced(
  searchString,
  () => {
    fetchData();
  },
  { debounce: 500, maxWait: 1000 }
);

function fetchData() {
  api
    .get(props.sourceUrl, {
      params: {
        query: searchString.value,
      },
    })
    .then((response) => {
      items.value = response.data.result;
    });
}
</script>
