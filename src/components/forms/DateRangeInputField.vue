<template>
  <div>
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
      :model-type="props.modelType"
      :enable-time-picker="props.enableTimePicker"
      :multi-calendars="props.multiCalendars"
      :time-picker-inline="true"
      :start-time="[
        { hours: 0, minutes: 0, seconds: 0 },
        { hours: 23, minutes: 59, seconds: 59 },
      ]"
      :clearable="false"
      :dark="themeStore.isDarkMode"
      :format="format"
      :min-date="props.minDate"
      range
    >
      <template #dp-input="{ value }">
        <button
          type="button"
          id="week-range-input"
          class="w-full text-sm text-left border rounded-lg border-input text-neutral-900 focus:ring-ring focus:ring-2 focus:border-input focus:ring-offset-2 focus:ring-offset-background dark:placeholder-neutral-400 dark:text-white"
          :class="[
            props.size === 'md' ? 'h-11 px-2.5 py-2' : 'h-12 p-2.5',
            hasError
              ? 'ring-2 border-none bg-red-50  text-red-900 placeholder-red-700  ring-red-500 focus:ring-red-500  dark:bg-red-900/10 dark:text-red-500 dark:placeholder-red-400 dark:ring-red-700 dark:focus:ring-red-700'
              : props.disabled
                ? 'cursor-not-allowed bg-neutral-100 dark:bg-neutral-800/50 dark:border-none'
                : 'bg-background',
          ]"
        >
          <div class="flex items-center justify-between font-inter">
            <div>
              <span
                v-show="!value"
                :class="[
                  hasError
                    ? 'text-red-700 dark:text-red-400'
                    : props.disabled
                      ? 'text-neutral-400 dark:text-neutral-400'
                      : 'text-neutral-400 dark:text-neutral-400',
                ]"
              >
                {{ props.placeholder }}
              </span>
              <span
                class="text-sm pr-4"
                :class="[
                  hasError
                    ? 'text-red-700 dark:text-red-400'
                    : props.disabled
                      ? 'text-neutral-500 dark:text-neutral-400'
                      : 'text-neutral-900 dark:text-white',
                ]"
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
                :class="[
                  hasError
                    ? 'text-red-700 dark:text-red-400'
                    : props.disabled
                      ? 'text-neutral-500 dark:text-neutral-400'
                      : 'text-neutral-400 dark:text-neutral-400',
                ]"
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
      class="mt-1 text-xs font-semibold text-red-600 dark:text-red-500"
    >
      {{ props.error[0] }}
    </p>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useThemeStore } from "@/store/themeStore";
import { watch, ref, computed } from "vue";
const props = defineProps({
  error: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: "Form Label",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Array],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "default",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  minDate: {
    type: Date,
    default: null,
  },
  enableTimePicker: {
    type: Boolean,
    default: false,
  },
  multiCalendars: {
    type: Boolean,
    default: false,
  },
  modelType: {
    type: String,
    default: "yyyy-MM-dd",
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
  const optionsDate = {
    month: "short", // Short month name (e.g., "Oct")
    year: "numeric", // Full year (e.g., "2024")
    day: "2-digit", // Day with two digits (e.g., "05")
  };

  const optionsTime = {
    hour: "2-digit", // Hour (e.g., "14")
    minute: "2-digit", // Minutes (e.g., "30")
    hour12: false, // Ensures 24-hour format
  };

  if (dt.length !== 2) {
    return;
  }

  const startDate = dt[0];
  const endDate = dt[1];

  // Get today's date and reset the time to 00:00:00 for comparison
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 0));

  // Normalize startDate and endDate to ignore time
  const normalizedStartDate = new Date(startDate);
  const normalizedEndDate = new Date(new Date(endDate).setSeconds(59));

  // Check if both dates are today
  const isToday =
    normalizedStartDate.getTime() === startOfToday.getTime() &&
    normalizedEndDate.getTime() === endOfToday.getTime();

  const formattedStartDate = startDate.toLocaleString("en-US", optionsDate);
  const formattedStartDateTime = startDate
    .toLocaleTimeString("en-US", optionsTime)
    .replace(":", ":");

  const formattedEndDate = endDate.toLocaleString("en-US", optionsDate);
  const formattedEndDateTime = endDate
    .toLocaleTimeString("en-US", optionsTime)
    .replace(":", ":");

  if (formattedStartDate === formattedEndDate) {
    return isToday
      ? "Today"
      : `${formattedStartDate}${props.enableTimePicker ? ` ${formattedStartDateTime} - ${formattedEndDateTime}` : ""}`;
  }

  return `${formattedStartDate}${props.enableTimePicker ? ` ${formattedStartDateTime}` : ""} - ${formattedEndDate}${props.enableTimePicker ? ` ${formattedEndDateTime}` : ""}`;
};

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
</script>

<style>
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #24e4cc;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #161616;
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
  --dp-primary-color: #003d5b;
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
