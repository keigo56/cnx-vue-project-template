<template>
  <div>
    <div class="flex flex-col-reverse gap-y-2">
      <Select
        :model-value="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :disabled="disabled"
      >
        <SelectTrigger
          :class="[
            hasError
              ? 'ring-2 border-none ring-red-500 focus-visible:ring-red-500 dark:ring-red-700'
              : '',
            'w-full cursor-pointer',
          ]"
        >
          <SelectValue :placeholder="placeholder" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="item in items"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </SelectItem>

            <div
              v-if="items.length === 0"
              class="relative flex items-center justify-center py-4 text-sm text-muted-foreground"
            >
              No data
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { computed } from "vue";

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
    type: [String, Number],
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
});

const emit = defineEmits(["update:modelValue"]);

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
</script>
