<template>
  <div
    class="px-1 py-1 cursor-pointer"
    :style="{
      height: rowHeight,
    }"
  >
    <div class="bg-white dark:bg-dark-100 h-full">
      <div
        class="h-full overflow-hidden px-1 py-1 bg-indigo-400 dark:bg-indigo-900 bg-opacity-60 dark:bg-opacity-50 rounded border-2 border-indigo-600 dark:border-indigo-700"
      >
        <span
          class="break-words text-indigo-800 dark:text-indigo-300 text-xs font-semibold line-clamp-2"
        >
          {{ props.schedule.meta.title }}
        </span>
        <p class="text-xs text-indigo-700 dark:text-indigo-300 mb-0.5">
          {{ props.schedule.meta.requestorName }}
        </p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">
          {{ props.schedule.meta.timeSchedule }}
        </p>
        <p class="text-xs text-indigo-700 dark:text-indigo-300">
          {{ props.schedule.meta.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ScheduleData } from "@/modules/calendar/types/ScheduleData";
import { useCalendarStore } from "@/modules/calendar/store/calendarStore";
import { computed } from "vue";

const calendarStore = useCalendarStore();

const props = defineProps({
  schedule: {
    type: Object as PropType<ScheduleData>,
    required: true,
  },
});

const rowHeight = computed(() => {
  return (
    (calendarStore.rowHeightInRems * props.schedule.time.duration).toString() +
    "rem"
  );
});
</script>
