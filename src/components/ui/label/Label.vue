<script setup>
import { cn } from "@/lib/utils";
import { Label } from "reka-ui";
import { computed } from "vue";
import { labelVariants } from ".";

const props = defineProps({
  for: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  variant: { type: String, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <Label
    data-slot="label"
    v-bind="delegatedProps"
    :class="cn(labelVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </Label>
</template>
