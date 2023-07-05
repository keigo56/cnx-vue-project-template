<template>
  <div class="flex justify-between items-center">
    <div>
      <p class="text-xs dark:text-white">
        Showing {{ props.rows.from }} - {{ props.rows.to }} of
        {{ props.rows.total }} records
      </p>
    </div>
    <nav>
      <ul class="inline-flex -space-x-px">
        <li v-for="(link, index) in props.rows.links" :key="link.label">
          <button
            @click="changePageNumber(link.url !== null, link.url)"
            v-if="index === 0"
            :class="[
              'px-3 py-2 ml-0 leading-tight text-gray-500 bg-gray-100 dark:bg-dark-100 border border-gray-300 rounded-l-lg dark:border-gray-700 dark:text-gray-400',
              link.url === null
                ? ' cursor-default'
                : ' cursor-pointer bg-white dark:bg-dark-900 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white',
            ]"
          >
            Previous
          </button>

          <button
            v-else-if="index !== props.rows.links.length - 1 && index !== 0"
            @click="changePageNumber(link.url !== null, link.url)"
            :class="[
              'px-3 py-2 leading-tight border border-gray-300 dark:border-gray-700 dark:bg-dark-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
              link.active
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700'
                : 'bg-white text-gray-500 dark:bg-dark-900 hover:bg-gray-100 hover:text-gray-700 ',
            ]"
          >
            {{ link.label }}
          </button>

          <button
            v-else-if="index === props.rows.links.length - 1"
            @click="changePageNumber(link.url !== null, link.url)"
            :class="[
              'px-3 py-2 ml-0 leading-tight text-gray-500 bg-gray-100 border dark:bg-dark-100 border-gray-300 rounded-r-lg dark:border-gray-700 dark:text-gray-400',
              link.url === null
                ? ' cursor-default'
                : ' cursor-pointer bg-white dark:bg-dark-900 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white',
            ]"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
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
</script>
