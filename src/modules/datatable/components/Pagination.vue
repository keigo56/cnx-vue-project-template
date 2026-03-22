<template>
  <div
    v-show="hasRows"
    class="py-3 px-3 dark:bg-background"
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
              v-if="index === 0"
              size="sm"
              variant="outline"
              :disabled="link.url === null"
              :class="[
                'rounded-l-md rounded-r-none w-8',
                link.url === null ? 'cursor-not-allowed' : '',
              ]"
              @click="changePageNumber(link.url !== null, link.url)"
            >
              <ChevronLeftIcon class="h-4" />
            </Button>

            <Button
              v-else-if="index !== props.rows.links.length - 1 && index !== 0"
              size="sm"
              :variant="link.active ? 'default' : 'outline'"
              class="rounded-none w-8"
              @click="changePageNumber(link.url !== null, link.url)"
            >
              <span class="text-xs">{{ link.label }}</span>
            </Button>

            <Button
              v-else-if="index === props.rows.links.length - 1"
              size="sm"
              variant="outline"
              :disabled="link.url === null"
              :class="[
                'rounded-l-none rounded-r-md w-8',
                link.url === null ? 'cursor-not-allowed' : '',
              ]"
              @click="changePageNumber(link.url !== null, link.url)"
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
import { computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import Button from '@/components/ui/button/Button.vue';
const props = defineProps({
  rows: {
    type: Object,
    default: () => ({
      current_page: 1,
      data: [],
      first_page_url: '',
      from: 1,
      last_page: 1,
      last_page_url: '',
      links: [
        {
          url: '',
          label: '1',
          active: true,
        },
      ],
      next_page_url: null,
      path: '',
      per_page: 15,
      prev_page_url: null,
      to: 4,
      total: 4,
    }),
  },
});

const emits = defineEmits(['changePage']);

function getPageNumber(pageUrl) {
  const url = new URL(pageUrl);
  return parseInt(url.searchParams.get('page'));
}

function changePageNumber(valid, url) {
  if (!valid) return;
  emits('changePage', getPageNumber(url));
}

const hasRows = computed(() => {
  if (!props.rows.data) {
    return false;
  }
  return props.rows.data.length > 0;
});
</script>
