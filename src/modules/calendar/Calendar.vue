<template>
  <div class="mb-10">
    <!-- Action Buttons -->
    <div>
      <div class="flex items-center justify-start space-x-4">
        <SelectField
          searchable
          class="w-64 text-left"
          placeholder="Select Site"
          id="site"
          v-model="searchParams.site"
          :items="sites"
          :show-label="false"
        />
        <SelectField
          searchable
          class="w-64 text-left"
          placeholder="Select Room Name"
          id="room-name"
          v-model="searchParams.roomName"
          :items="roomNames"
          :show-label="false"
        />
        <div class="w-72">
          <!-- <VueDatePicker
            v-model="date"
            week-picker
            week-start="0"
            model-type="YYYY-MM-dd"
            :enable-time-picker="false"
            :clearable="false"
            auto-apply
            :dark="themeStore.isDarkMode"
            :format="format"
          >
          </VueDatePicker> -->

          <VueDatePicker
            v-model="searchParams.date"
            week-picker
            week-start="0"
            model-type="YYYY-MM-dd"
            :enable-time-picker="false"
            :clearable="false"
            auto-apply
            :dark="themeStore.isDarkMode"
            :format="format"
          >
            <template #dp-input="{ value }">
              <button
                type="button"
                id="week-range-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 block w-full p-2.5 dark:bg-dark-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              >
                <div class="flex items-center justify-between">
                  <span class="text-md">{{ value }}</span>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 text-indigo-600"
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
        </div>
      </div>
    </div>
    <div
      class="relative rounded overflow-hidden"
      v-show="!loading"
    >
      <!-- Header -->
      <div
        class="flex sticky top-0 w-full z-10 bg-gray-100 dark:bg-dark-900 shadow-sm"
      >
        <div
          class="w-16 flex-shrink-0 border border-b-2 border-gray-300 dark:border-dark-100"
        ></div>
        <div class="flex-grow">
          <div class="grid grid-cols-7">
            <div
              class="h-20 py-4 px-4 border-t border-b-2 border-gray-300 dark:border-dark-100"
              :class="[
                day.isToday
                  ? 'border-t-4 border-t-indigo-800 dark:border-t-indigo-600'
                  : '',
                index !== days.length - 1 ? 'border-r' : '',
              ]"
              v-for="(day, index) in days"
              :key="day.day"
            >
              <div
                :class="[
                  day.isToday
                    ? 'text-indigo-800 dark:text-indigo-600'
                    : 'text-gray-800 dark:text-gray-400',
                ]"
              >
                <p class="text-xl font-semibold">{{ day.day }}</p>
                <p
                  class="text-xs"
                  :class="[day.isToday && 'font-semibold']"
                >
                  {{ day.dayOfTheWeek }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-3 flex-shrink-0 border-b-2 border-t border-r border-gray-300 dark:border-dark-100"
        ></div>
      </div>
      <!-- Body -->
      <div
        class="flex z-10 bg-gray-100 dark:bg-[#171a1f] h-screen overflow-auto calendar-scroll"
      >
        <div class="w-16 flex-shrink-0">
          <div
            class="border-gray-300 border-l border-r dark:border-neutral-800"
            :class="[timeSlotIndex === timeSlots.length - 1 && 'border-b']"
            :style="{
              height: calendarStore.rowHeightInRems + 'rem',
            }"
            v-for="(timeSlot, timeSlotIndex) in timeSlots"
            :key="timeSlot.label"
          >
            <p class="text-center text-xs dark:text-gray-300">
              {{ timeSlot.label }}
            </p>
          </div>
        </div>
        <div class="relative flex-grow">
          <div class="grid grid-cols-7">
            <div
              class="border-r border-gray-300 dark:border-neutral-800"
              v-for="day in days"
              :key="day.day"
            >
              <div
                class="border-b border-gray-300 dark:border-neutral-800"
                :style="{
                  height: calendarStore.rowHeightInRems + 'rem',
                }"
                v-for="timeSlot in timeSlots"
                :key="timeSlot.timeValue"
              ></div>
            </div>
          </div>
          <div
            class="absolute top-0 left-0 grid grid-cols-7 grid-flow-row w-full h-full"
          >
            <div
              v-for="day in days"
              :key="day.dateValue"
            >
              <div
                :style="{
                  height: calendarStore.rowHeightInRems + 'rem',
                }"
                v-for="timeSlot in timeSlots"
                :key="timeSlot.label"
              >
                <div v-for="schedule in schedules">
                  <ScheduleCard
                    v-if="
                      day.dateValue === schedule.date &&
                      timeSlot.timeValue === schedule.time.start
                    "
                    :schedule="schedule"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative rounded overflow-hidden"
      v-show="loading"
    >
      <!-- Header -->
      <div
        class="flex sticky top-0 w-full z-10 bg-gray-100 dark:bg-dark-900 shadow-sm"
      >
        <div
          class="w-16 flex-shrink-0 border border-b-2 border-gray-300 dark:border-dark-100"
        ></div>
        <div class="flex-grow">
          <div class="grid grid-cols-7">
            <div
              class="h-20 py-4 px-4 border-t border-b-2 border-gray-300 dark:border-dark-100"
              :class="[index !== 6 ? 'border-r' : '']"
              v-for="index in 7"
              :key="index"
            >
              <div class="text-gray-800 dark:text-gray-400">
                <div
                  v-show="
                    searchParams.site !== '' && searchParams.roomName !== ''
                  "
                >
                  <p class="text-xl font-semibold">...</p>
                  <p class="text-xs">...</p>
                </div>

                <div
                  v-show="
                    searchParams.site === '' || searchParams.roomName === ''
                  "
                >
                  <p class="text-xl font-semibold"></p>
                  <p class="text-xs"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-3 flex-shrink-0 border-b-2 border-t border-r border-gray-300 dark:border-dark-100"
        ></div>
      </div>
      <!-- Body -->
      <div
        class="flex z-10 bg-gray-100 dark:bg-[#171a1f] h-screen overflow-auto calendar-scroll"
      >
        <div class="w-16 flex-shrink-0">
          <div
            class="border-gray-300 border-l border-r dark:border-neutral-800"
            :class="[timeSlotIndex === timeSlots.length - 1 && 'border-b']"
            :style="{
              height: calendarStore.rowHeightInRems + 'rem',
            }"
            v-for="(timeSlot, timeSlotIndex) in timeSlots"
            :key="timeSlot.label"
          >
            <p class="text-center text-xs dark:text-gray-300">
              {{ timeSlot.label }}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center w-full h-full">
          <h1
            class="text-lg font-semibold text-indigo-800 dark:text-indigo-400"
          >
            <span
              v-show="searchParams.site !== '' && searchParams.roomName !== ''"
              >Please wait. Loading schedules...</span
            >
            <span
              v-show="searchParams.site === '' || searchParams.roomName === ''"
              >Please select site and room</span
            >
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from "@/api/api";
import { ref, watch, onMounted, reactive } from "vue";
import { ScheduleData } from "@/modules/calendar/types/ScheduleData";
import ScheduleCard from "@/modules/calendar/components/ScheduleCard.vue";
import { useCalendarStore } from "@/modules/calendar/store/calendarStore";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useThemeStore } from "@/store/global/themeStore";
import SelectField from "@/components/forms/SelectField.vue";

interface Day {
  day: string;
  dateValue: string;
  dayOfTheWeek: string;
  isToday: boolean;
}

onMounted(() => {
  setDefaultDate();
  getSites();
});

const searchParams = reactive({
  date: null,
  site: "",
  roomName: "",
});

const date = ref();
const calendarStore = useCalendarStore();
const themeStore = useThemeStore();

const loading = ref(true);

const timeSlots = ref([
  {
    label: "12 AM",
    timeValue: "12:00 AM",
  },
  {
    label: "1 AM",
    timeValue: "01:00 AM",
  },
  {
    label: "2 AM",
    timeValue: "02:00 AM",
  },
  {
    label: "3 AM",
    timeValue: "03:00 AM",
  },
  {
    label: "4 AM",
    timeValue: "04:00 AM",
  },
  {
    label: "5 AM",
    timeValue: "05:00 AM",
  },
  {
    label: "6 AM",
    timeValue: "06:00 AM",
  },
  {
    label: "7 AM",
    timeValue: "07:00 AM",
  },
  {
    label: "8 AM",
    timeValue: "08:00 AM",
  },
  {
    label: "9 AM",
    timeValue: "09:00 AM",
  },
  {
    label: "10 AM",
    timeValue: "10:00 AM",
  },
  {
    label: "11 AM",
    timeValue: "11:00 AM",
  },
  {
    label: "12 PM",
    timeValue: "12:00 PM",
  },
  {
    label: "1 PM",
    timeValue: "01:00 PM",
  },
  {
    label: "2 PM",
    timeValue: "02:00 PM",
  },
  {
    label: "3 PM",
    timeValue: "03:00 PM",
  },
  {
    label: "4 PM",
    timeValue: "04:00 PM",
  },
  {
    label: "5 PM",
    timeValue: "05:00 PM",
  },
  {
    label: "6 PM",
    timeValue: "06:00 PM",
  },
  {
    label: "7 PM",
    timeValue: "07:00 PM",
  },
  {
    label: "8 PM",
    timeValue: "08:00 PM",
  },
  {
    label: "9 PM",
    timeValue: "09:00 PM",
  },
  {
    label: "10 PM",
    timeValue: "10:00 PM",
  },
  {
    label: "11 PM",
    timeValue: "11:00 PM",
  },
]);

const days = ref<Day[]>([]);

const schedules = ref<ScheduleData[]>([
  {
    date: "2024-03-08",
    time: {
      start: "10:00 PM",
      end: "2:00 AM",
      duration: 1,
    },
    meta: {
      title: "Samsung",
      timeSchedule: "01:00 AM - 03:00 AM",
      requestorName: "Keigo Victor Fujita",
      description: "AdHoc - Workshop",
    },
  },
  {
    date: "2024-03-09",
    time: {
      start: "01:00 PM",
      end: "03:00 PM",
      duration: 2,
    },
    meta: {
      title: "Samsung Electronics Australia",
      timeSchedule: "01:00 PM - 03:00 PM",
      requestorName: "Keigo Victor Fujita",
      description: "AdHoc - Workshop",
    },
  },
]);

const format = (dt) => {
  const options = {
    month: "long", // Full month name
    year: "numeric", // Full numeric year
  };

  const startDate = searchParams.date[0];
  const endDate = searchParams.date[1];

  if (
    startDate.toLocaleString("en-US", options) ===
    endDate.toLocaleString("en-US", options)
  ) {
    return endDate.toLocaleString("en-US", options);
  }

  return (
    startDate.toLocaleString("en-US", options) +
    " - " +
    endDate.toLocaleString("en-US", options)
  );
};

const formattedDate = (date) => {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  const formattedDateTime = `${year}-${month}-${day}`;
  return formattedDateTime;
};

const setDefaultDate = () => {
  // Get the current date
  const currentDate = new Date();

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const currentDayOfWeek = currentDate.getDay();

  // Calculate the difference between the current day of the week and Sunday (0)
  const daysUntilSunday = -currentDayOfWeek;

  // Calculate the difference between the current day of the week and Saturday (6)
  const daysUntilSaturday = 6 - currentDayOfWeek;

  // Create new Date objects for Sunday and Saturday
  const sundayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + daysUntilSunday
  );
  const saturdayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + daysUntilSaturday
  );
  searchParams.date = [sundayDate, saturdayDate];
};

// filter models
const site = ref("");
const roomName = ref("");

// dropdown Items
const sites = ref([]);
const roomNames = ref([]);

const getSites = () => {
  api.get("/api/calendar/dropdown/sites").then((response) => {
    sites.value = response.data.sites.map((item) => {
      return { value: item.site, label: item.site };
    });
  });
};

const getRooms = () => {
  api
    .get("/api/calendar/dropdown/rooms", {
      params: {
        site: searchParams.site,
      },
    })
    .then((response) => {
      roomNames.value = response.data.room_names.map((item) => {
        return { value: item.room_name, label: item.room_name };
      });
    });
};

watch(
  () => searchParams.site,
  (site) => {
    if (searchParams.site === "") {
      return;
    }

    roomNames.value = [];
    searchParams.roomName = "";
    getRooms();
  }
);

watch(searchParams, () => {
  if (
    searchParams.site === "" ||
    searchParams.roomName === "" ||
    searchParams.date.length !== 2
  ) {
    return;
  }

  loading.value = true;
  days.value = null;
  schedules.value = null;

  api
    .get("/api/calendar/schedules", {
      params: {
        start_date: formattedDate(searchParams.date[0]),
        end_date: formattedDate(searchParams.date[1]),
        site: searchParams.site,
        room_name: searchParams.roomName,
      },
    })
    .then((response) => {
      days.value = response.data.days;
      schedules.value = response.data.schedules;
      loading.value = false;
    });
  return;
});
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
