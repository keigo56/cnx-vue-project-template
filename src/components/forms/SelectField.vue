<template>
  <div>
    <label
      v-show="showLabel"
      :for="props.id"
      class="block mb-2 text-sm font-medium"
      :class="[
        hasError
          ? 'text-red-500 dark:text-red-600'
          : props.disabled
            ? 'text-neutral-500 dark:text-neutral-500'
            : 'text-neutral-900 dark:text-white',
        ,
      ]"
    >
      {{ props.label }}
    </label>
    <Listbox
      :disabled="props.disabled"
      :model-value="props.modelValue"
      @update:model-value="
        (value) => {
          emit('update:modelValue', value);
        }
      "
    >
      <div class="relative font-inter">
        <ListboxButton
          class="relative w-full text-sm text-left border rounded-lg border-input text-neutral-900 focus:ring-ring focus:ring-2 focus:border-input focus:ring-offset-2 focus:ring-offset-background dark:placeholder-neutral-400 dark:text-white"
          :class="[
            props.size === 'sm' ? 'h-9 px-2 py-1' : 'h-11 p-2.5',
            hasError
              ? ' ring-2 border-none bg-red-50  text-red-900 placeholder-red-700  ring-red-500 focus:ring-red-500  dark:bg-red-900/10 dark:text-red-500 dark:placeholder-red-400 dark:ring-red-700 dark:focus:ring-red-700'
              : props.disabled
                ? 'cursor-not-allowed bg-neutral-100 dark:bg-neutral-800/50 dark:border-none'
                : 'bg-background',
          ]"
        >
          <span
            class="block mr-5 truncate"
            :class="[
              props.size === 'sm' ? 'text-xs' : 'text-sm',
              hasError
                ? 'text-red-700 dark:text-red-400'
                : props.disabled
                  ? 'text-neutral-500 dark:text-neutral-400'
                  : 'text-neutral-900 dark:text-white',
            ]"
            v-if="props.modelValue"
          >
            {{ props.loading === true ? "Loading..." : label }}
          </span>
          <span
            class="block truncate"
            :class="[
              props.size === 'sm' ? 'text-xs' : 'text-sm',
              hasError
                ? 'text-red-700 dark:text-red-400'
                : props.disabled
                  ? 'text-neutral-400 dark:text-neutral-400'
                  : 'text-neutral-400 dark:text-neutral-400',
            ]"
            v-else
          >
            {{ props.placeholder }}
          </span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <ChevronUpDownIcon
              :class="[
                props.size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
                hasError
                  ? 'text-red-700 dark:text-red-400'
                  : props.disabled
                    ? 'text-neutral-500 dark:text-neutral-600'
                    : 'text-neutral-400 dark:text-neutral-400',
              ]"
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
            class="absolute z-20 w-full mt-1 text-base bg-white rounded-md shadow-lg dark:bg-neutral-900 dark:text-white ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:border dark:border-neutral-700"
          >
            <div class="relative">
              <div
                v-if="props.searchable"
                class="w-full overflow-hidden border-b dark:border-neutral-700"
              >
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500"
                >
                  <MagnifyingGlassIcon
                    :class="[props.size === 'sm' ? 'w-4 h-4' : 'w-5 h-5']"
                    aria-hidden="true"
                  />
                </span>
                <div class="pl-10">
                  <input
                    @keydown="(e) => e.stopPropagation()"
                    v-model="searchTerm"
                    placeholder="Search..."
                    type="text"
                    class="border-none focus:outline-none focus:ring-0 text-gray-900 rounded-lg block w-full py-2.5 px-0 dark:bg-neutral-900 dark:text-white"
                    :class="[props.size === 'sm' ? 'text-xs' : 'text-sm']"
                  />
                </div>
              </div>
            </div>

            <div class="py-1 overflow-auto max-h-48 select-scroll">
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
                    class="block truncate"
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      props.size === 'sm' ? 'text-xs' : 'text-sm',
                    ]"
                    >{{ item.label }}</span
                  >
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-white"
                  >
                    <CheckIcon
                      class="w-5 h-5"
                      aria-hidden="true"
                    />
                  </span>
                </li>
              </ListboxOption>
              <div
                class="flex items-center justify-center px-2 py-5"
                v-if="itemsRef.length === 0 || props.loading"
              >
                <span v-show="props.loading === true"> Loading data... </span>
                <span v-show="itemsRef.length === 0 && !props.loading">
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
      class="mt-1 text-xs font-semibold text-red-500 dark:text-red-600"
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
  size: {
    type: String,
    default: "default",
    required: false,
  },
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
  loading: {
    type: Boolean,
    default: false,
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
  disabled: {
    type: Boolean,
    default: false,
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
      item.label.toLowerCase().includes(searchTermLowerCase),
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
