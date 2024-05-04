<template>
  <div
    class="py-3 px-3 dark:bg-dark-900"
    v-show="hasRows"
  >
    <div class="flex justify-between items-center">
      <div>
        <p class="text-xs dark:text-white">
          Showing {{ props.rows.from }} - {{ props.rows.to }} of
          {{ props.rows.total }} records
        </p>
      </div>
      <nav>
        <ul class="inline-flex -space-x-px">
          <li
            v-for="(link, index) in props.rows.links"
            :key="link.label"
          >
            <button
              @click="changePageNumber(link.url !== null, link.url)"
              v-if="index === 0"
              :class="[
                'h-8 px-2 py-1.5 text-sm ml-0 leading-tight text-gray-500 bg-gray-100 dark:bg-dark-100 border border-gray-300 rounded-l-md dark:border-dark-100 dark:text-gray-400',
                link.url === null
                  ? ' cursor-not-allowed dark:bg-dark-900'
                  : ' cursor-pointer bg-white dark:bg-dark-900 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-neutral-900 dark:hover:text-white',
              ]"
            >
              <ChevronLeftIcon class="h-4" />
            </button>

            <button
              v-else-if="index !== props.rows.links.length - 1 && index !== 0"
              @click="changePageNumber(link.url !== null, link.url)"
              :class="[
                'h-8 px-3 py-1.5 text-sm leading-tight border border-gray-300 dark:border-dark-100  dark:bg-dark-100 dark:text-gray-400 dark:hover:bg-neutral-900 dark:hover:text-white',
                link.active
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:bg-neutral-800'
                  : 'bg-white text-gray-500 dark:bg-dark-900 hover:bg-gray-100 hover:text-gray-700 ',
              ]"
            >
              {{ link.label }}
            </button>

            <button
              v-else-if="index === props.rows.links.length - 1"
              @click="changePageNumber(link.url !== null, link.url)"
              :class="[
                'h-8 px-2 py-1.5 text-sm ml-0 leading-tight text-gray-500 bg-gray-100 border dark:bg-dark-100 border-gray-300 rounded-r-md dark:border-dark-100 dark:text-gray-400',
                link.url === null
                  ? ' cursor-not-allowed dark:bg-dark-900'
                  : ' cursor-pointer bg-white dark:bg-dark-900 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-neutral-900 dark:hover:text-white ',
              ]"
            >
              <ChevronRightIcon class="h-4" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
const props = defineProps({
  rows: {
    type: Object,
    default: {
      current_page: 1,
      data: [],
      first_page_url: "",
      from: 1,
      last_page: 1,
      last_page_url: "",
      links: [
        {
          url: "",
          label: "1",
          active: true,
        },
      ],
      next_page_url: null,
      path: "",
      per_page: 15,
      prev_page_url: null,
      to: 4,
      total: 4,
    },
  },
});

const emits = defineEmits(["changePage"]);

function getPageNumber(pageUrl) {
  const url = new URL(pageUrl);
  return parseInt(url.searchParams.get("page"));
}

function changePageNumber(valid, url) {
  if (!valid) return;
  emits("changePage", getPageNumber(url));
}

const hasRows = computed(() => {
  if (!props.rows.data) {
    return false;
  }
  return props.rows.data.length > 0;
});
</script>
