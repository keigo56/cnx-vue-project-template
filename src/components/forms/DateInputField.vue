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
    <VueDatePicker
      :model-value="props.modelValue"
      @update:model-value="
        (value) => {
          emit('update:modelValue', value);
        }
      "
      week-start="0"
      model-type="yyyy-MM-dd"
      :enable-time-picker="false"
      auto-apply
      :clearable="false"
      :dark="themeStore.isDarkMode"
      :format="format"
      :min-date="props.minDate"
    >
      <template #dp-input="{ value }">
        <button
          type="button"
          id="week-range-input"
          :class="[
            hasError
              ? 'relative w-full cursor-pointer rounded-md bg-white dark:bg-dark-100 dark:text-white py-2.5 px-3 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6'
              : 'relative w-full cursor-pointer rounded-md bg-white dark:bg-dark-100 dark:text-white py-2.5 px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6',
          ]"
          class=""
        >
          <div class="flex items-center justify-between font-inter">
            <div>
              <span
                v-show="!value"
                class="font-semibold"
                :class="[hasError ? 'text-red-500' : 'text-gray-500']"
              >
                {{ props.placeholder }}
              </span>
              <span
                class="text-sm"
                :class="[hasError ? 'text-red-500' : 'dark:text-white']"
              >
                {{ value }}
              </span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
                :class="[hasError ? 'text-red-600' : 'text-gray-600']"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </div>
          </div>
        </button>
      </template>
    </VueDatePicker>
    <p
      v-show="hasError"
      class="mt-1 text-xs text-red-600 dark:text-red-500 font-semibold"
    >
      {{ props.error[0] }}
    </p>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useThemeStore } from "@/store/global/themeStore";
import { watch, ref, computed } from "vue";
const props = defineProps({
  error: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: "Form Label",
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  minDate: {
    type: Date,
    default: null,
  },
});

const themeStore = useThemeStore();

const emit = defineEmits(["update:modelValue"]);

const hasError = computed({
  get() {
    return errors.value.length > 0;
  },
});

const format = (dt) => {
  const options = {
    month: "long", // Full month name
    year: "numeric", // Full numeric year
    day: "numeric",
  };

  return dt.toLocaleString("en-US", options);
};

const errors = ref([]);

watch(
  () => props.error,
  (newValue, oldValue) => {
    errors.value = newValue;
  }
);

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    errors.value = [];
  }
);
</script>

<style>
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #312e81;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #4f46e5;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
</style>
