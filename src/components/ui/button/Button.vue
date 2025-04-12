<script setup>
import { cn } from "@/lib/utils";
import { Primitive } from "reka-ui";
import { buttonVariants } from ".";

const props = defineProps({
  loading: { type: Boolean, required: false, default: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false, default: "button" },
});
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <div
      v-if="loading"
      class="flex items-center space-x-4"
      :class="[variant === 'default' || (variant === undefined && 'reverse')]"
    >
      <div class="w-4 h-4 mr-2 loader"></div>
      <slot />
    </div>

    <slot v-if="!loading" />
  </Primitive>
</template>
