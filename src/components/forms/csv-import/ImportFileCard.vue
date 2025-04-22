<template>
  <div
    class="h-16 relative cursor-pointer border border-green-700/60 dark:border-green-700/60 bg-neutral-50 bg-green-900/10 dark:bg-green-900/5 hover:bg-green-900/15 dark:hover:bg-green-900/10 rounded-md mt-4 px-3 py-3"
  >
    <div class="absolute right-2 top-2">
      <Button
        @click="emit('fileRemoved')"
        class="p-1 h-5 w-5 hover:bg-green-900/10 dark:hover:bg-green-900/10"
        variant="ghost"
        size="xs"
      >
        <XMarkIcon class="h-4 w-4 text-green-800 dark:text-green-800" />
      </Button>
    </div>
    <div class="flex space-x-2">
      <div class="rounded p-1 dark:border-green-700/40 dark:bg-neutral-800/10">
        <ExcelIcon class="w-7 h-8" />
      </div>
      <div class="font-inter">
        <p
          class="text-green-900 dark:text-neutral-200 text-xs mb-0.5 font-semibold"
        >
          {{ name }}
        </p>
        <p class="text-green-800 dark:text-neutral-400 text-xs">
          {{ fileSizeToHumanReadable }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/20/solid";
import ExcelIcon from "@/assets/icons/ExcelIcon.vue";
import Button from "@/components/ui/button/Button.vue";
import { computed } from "vue";

const emit = defineEmits(["fileRemoved"]);

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
});

const fileSizeToHumanReadable = computed(() => {
  const bytes = props.size;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (props.size === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
});
</script>
