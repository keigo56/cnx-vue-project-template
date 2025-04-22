<script setup>
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";
import { inputVariants } from ".";

const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  class: { type: null, required: false },
  variant: { type: String, required: false },
});

const emits = defineEmits(["update:modelValue"]);

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(inputVariants({ variant: props.variant }), props.class)"
  />
</template>
