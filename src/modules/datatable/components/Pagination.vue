<template>
  <div
    class="py-3 px-3 dark:bg-background"
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
            <Button
              size="sm"
              variant="outline"
              :disabled="link.url === null"
              @click="changePageNumber(link.url !== null, link.url)"
              v-if="index === 0"
              :class="[
                'rounded-l-md rounded-r-none w-8',
                link.url === null ? 'cursor-not-allowed' : '',
              ]"
            >
              <ChevronLeftIcon class="h-4" />
            </Button>

            <Button
              size="sm"
              :variant="link.active ? 'default' : 'outline'"
              v-else-if="index !== props.rows.links.length - 1 && index !== 0"
              @click="changePageNumber(link.url !== null, link.url)"
              class="rounded-none w-8"
            >
              <span class="text-xs">{{ link.label }}</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              :disabled="link.url === null"
              v-else-if="index === props.rows.links.length - 1"
              @click="changePageNumber(link.url !== null, link.url)"
              :class="[
                'rounded-l-none rounded-r-md w-8',
                link.url === null ? 'cursor-not-allowed' : '',
              ]"
            >
              <ChevronRightIcon class="h-4" />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import Button from "@/components/ui/button/Button.vue";
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
