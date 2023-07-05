<template>
  <TransitionRoot appear :show="props.isOpen === true" as="template">
    <Dialog
      as="div"
      @close="props.dismissible && emit('closedModal')"
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-25 dark:bg-white/30 dark:backdrop-blur-sm"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :style="{
                width: props.width,
              }"
              class="w-full transform rounded-md bg-white dark:bg-dark-100 dark:text-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
              >
                {{ props.title }}
              </DialogTitle>
              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Modal Title",
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: "30rem",
  },
});

const emit = defineEmits(["closedModal"]);
</script>
