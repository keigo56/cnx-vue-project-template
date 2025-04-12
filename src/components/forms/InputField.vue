<template>
  <div>
    <label
      v-show="showLabel"
      :for="props.id"
      class="block mb-2 text-sm font-medium"
      :class="[
        props.error.length > 0
          ? 'text-red-500 dark:text-red-500'
          : props.disabled
            ? 'text-neutral-500 dark:text-neutral-500'
            : 'text-neutral-900 dark:text-white',
      ]"
    >
      {{ props.label }}
    </label>
    <input
      :type="props.type"
      :value="props.modelValue"
      @input="($event) => emit('update:modelValue', $event.target.value)"
      type="text"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :id="props.id"
      :class="[
        'flex h-11 w-full',
        props.error.length > 0
          ? 'bg-red-50 text-red-900 placeholder-red-700 text-sm rounded-lg border-none ring-red-500 focus:ring-red-500 focus:ring-2 dark:bg-red-900/10 ring-2 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-400 dark:ring-red-700 dark:focus:ring-2 dark:border-none'
          : 'py-2 px-3 bg-background border-input rounded-lg border text-sm placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
      ]"
    />
    <p
      v-show="props.error"
      class="mt-1 text-xs font-semibold text-red-500 dark:text-red-500"
    >
      {{ props.error[0] }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  error: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: "Form Label",
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
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

const emit = defineEmits(["update:modelValue"]);
</script>
