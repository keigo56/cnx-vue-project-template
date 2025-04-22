<template>
  <div>
    <div class="flex flex-col-reverse gap-y-2">
      <Combobox
        v-model="selectedItem"
        by="label"
        :disabled="disabled"
      >
        <ComboboxAnchor as-child>
          <ComboboxTrigger
            as-child
            :class="[
              hasError
                ? 'ring-2 border-none ring-red-500 focus-visible:ring-red-500 dark:ring-red-700'
                : '',
              'w-full',
            ]"
          >
            <Button
              variant="outline"
              class="justify-between data-[placeholder=true]:text-muted-foreground font-normal"
              :data-placeholder="!selectedItem"
            >
              {{ selectedItem?.label ?? placeholder }}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </ComboboxTrigger>
        </ComboboxAnchor>

        <ComboboxList class="w-[var(--reka-combobox-trigger-width)]">
          <div class="relative w-full items-center">
            <ComboboxInput
              class="focus-visible:ring-0 border-0 rounded-none h-10"
              :placeholder="placeholder"
              :loading="loading"
              @input="handleSearch"
            />
          </div>

          <ComboboxEmpty> No items found. </ComboboxEmpty>

          <ComboboxGroup>
            <ComboboxItem
              v-for="item in items"
              :key="item.value"
              :value="item"
            >
              {{ item.label }}
              <ComboboxItemIndicator>
                <Check :class="cn('ml-auto h-4 w-4')" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>

      <Label
        v-show="showLabel"
        :for="id"
        :variant="hasError ? 'error' : 'default'"
        :class="disabled ? 'cursor-not-allowed opacity-50' : ''"
      >
        {{ label }}
      </Label>
    </div>

    <span
      v-show="hasError"
      class="text-xs font-semibold text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { Check, ChevronsUpDown, Search } from "lucide-vue-next";
import { computed } from "vue";
import { Label } from "@/components/ui/label";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  error: {
    type: [Array, String],
    default: () => [],
  },
  label: {
    type: String,
    default: "Form Label",
    required: true,
  },
  modelValue: {
    type: [String, Number, Object],
  },
  placeholder: {
    type: String,
    default: "Select item...",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
  debounceMs: {
    type: Number,
    default: 300,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "search"]);

const selectedItem = ref();

onMounted(() => {
  selectedItem.value =
    props.items.find((item) => item.value === props.modelValue) || undefined;
});

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (!newVal) {
      return;
    }
    selectedItem.value =
      props.items.find((item) => item.value === newVal) || undefined;
  },
);

watch(
  () => props.items,
  (newVal, oldVal) => {
    if (!newVal) {
      return;
    }
    selectedItem.value =
      props.items.find((item) => item.value === newVal) || undefined;
  },
);

watch(selectedItem, (newVal) => {
  if (!newVal) {
    return;
  }
  emit("update:modelValue", newVal.value);
});

const hasError = computed(() => {
  if (Array.isArray(props.error)) {
    return props.error.length > 0;
  }
  return !!props.error;
});

const errorMessage = computed(() => {
  if (Array.isArray(props.error)) {
    return props.error[0] || "";
  }
  return props.error || "";
});

let searchTimeout = null;

const handleSearch = (event) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    emit("search", event.target.value);
  }, props.debounceMs);
};
</script>
