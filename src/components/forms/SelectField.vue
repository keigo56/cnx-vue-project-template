<template>
  <div class="my-5">
    <label
      v-show="showLabel"
      :for="props.id"
      :class="[
        hasError
          ? 'block mb-2 text-sm font-medium text-red-900 dark:text-red-400'
          : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
      ]"
    >
      {{ props.label }}
    </label>
    <Listbox
      :model-value="props.modelValue"
      @update:model-value="
        (value) => {
          emit('update:modelValue', value);
        }
      "
    >
      <div class="relative mt-1 font-inter">
        <ListboxButton
          :class="[
            hasError
              ? 'relative w-full cursor-pointer rounded-md bg-white dark:bg-dark-100 dark:text-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6'
              : 'relative w-full cursor-pointer rounded-md bg-white dark:bg-dark-100 dark:text-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6',
          ]"
        >
          <span
            class="block truncate"
            v-if="props.modelValue"
          >
            {{ label }}
          </span>
          <span
            class="block truncate font-semibold"
            :class="[hasError ? 'text-red-500' : 'text-gray-500']"
            v-else
          >
            {{ props.placeholder }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5"
              :class="[hasError ? 'text-red-600' : 'text-gray-600']"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <ListboxOptions
            class="z-20 absolute mt-1 w-full rounded-md bg-white dark:bg-neutral-900 dark:text-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:border dark:border-neutral-700"
          >
            <div class="relative">
              <div
                v-if="props.searchable"
                class="border-b dark:border-neutral-700 overflow-hidden w-full"
              >
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500"
                >
                  <MagnifyingGlassIcon
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
                <div class="pl-10">
                  <input
                    v-model="searchTerm"
                    placeholder="Search..."
                    type="text"
                    class="border-none focus:outline-none focus:ring-0 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-0 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div class="overflow-auto max-h-60 py-1 select-scroll">
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="item in itemsRef"
                :key="item.key"
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
                    <CheckIcon
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                </li>
              </ListboxOption>
              <div
                class="px-2 py-5 flex justify-center items-center"
                v-show="itemsRef.length === 0"
              >
                <span>
                  {{ searchTerm === "" ? "No data" : "Nothing found." }}
                </span>
              </div>
            </div>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <p
      v-show="hasError"
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

import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/20/solid";
import { computed, ref, watch } from "vue";
import { watchDebounced } from "@vueuse/core";
import { api } from "@/api/api.js";
import { onMounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: [],
    required: false,
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
    required: false,
  },
  modelValue: {
    type: [String, Number],
  },
  placeholder: {
    type: String,
    default: "Select item...",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  serverSide: {
    type: Boolean,
    default: false,
  },
  sourceUrl: {
    type: String,
    default: "",
    required: false,
  },
});

const label = computed(() => {
  return props.items.find((item) => item.value === props.modelValue)?.label;
});

const searchTerm = ref("");

const itemsRef = ref([]);

onMounted(() => {
  itemsRef.value = props.items;
});

watchDebounced(
  searchTerm,
  () => {
    if (props.serverSide === true) {
      fetchData();
      return;
    }

    if (searchTerm.value === "") {
      let itemsFromProps = props.items;
      itemsRef.value = itemsFromProps;
      return;
    }

    const searchTermLowerCase = searchTerm.value.toLowerCase();
    itemsRef.value = props.items.filter((item) =>
      item.value.toLowerCase().includes(searchTermLowerCase),
    );
  },
  { debounce: props.serverSide === true ? 500 : 0 },
);

watch(props, (oldValue, newValue) => {
  let itemsFromProps = props.items;
  itemsRef.value = itemsFromProps;
});

const hasError = computed(() => {
  return errors.value.length > 0;
});

const errors = ref([]);

watch(
  () => props.error,
  (newValue, oldValue) => {
    errors.value = newValue;
  },
);

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    errors.value = [];
  },
);

const emit = defineEmits(["update:modelValue"]);

const fetchData = async () => {
  let serverItemsData = await api.get(props.sourceUrl, {
    params: {
      search_term: searchTerm.value,
    },
  });
  itemsRef.value = serverItemsData.data.items;
};
</script>
