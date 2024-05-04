<template>
  <div class="my-5">
    <label
      v-show="showLabel"
      :for="props.id"
      :class="[
        props.error.length > 0
          ? 'block mb-2 text-sm font-medium text-red-900 dark:text-red-400'
          : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
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
        props.error.length > 0
          ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-dark-100 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
          : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-dark-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      ]"
    />
    <p
      v-show="props.error"
      class="mt-1 text-xs text-red-600 dark:text-red-500 font-semibold"
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
