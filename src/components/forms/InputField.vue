<template>
  <div>
    <div class="flex flex-col-reverse gap-y-2">
      <Input
        :id="props.id"
        :type="props.type"
        :model-value="props.modelValue"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :variant="hasError ? 'error' : 'default'"
        @update:model-value="($event) => emit('update:modelValue', $event)"
      />
      <Label
        v-show="showLabel"
        :for="props.id"
        :variant="hasError ? 'error' : 'default'"
        :class="disabled ? 'cursor-not-allowed opacity-50' : ''"
      >
        {{ props.label }}
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    required: true,
  },
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
    default: 'Form Label',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const hasError = computed(() => {
  if (Array.isArray(props.error)) {
    return props.error.length > 0;
  }
  return !!props.error;
});

const errorMessage = computed(() => {
  if (Array.isArray(props.error)) {
    return props.error[0] || '';
  }
  return props.error || '';
});
</script>
