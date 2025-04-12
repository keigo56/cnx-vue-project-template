<template>
  <div class="flex flex-col h-72">
    <div
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onFileDrop"
      class="h-full border-2 border-dashed rounded dark:border-neutral-900 border-spacing-4"
      :class="[
        hasFileBeingDragged
          ? 'bg-neutral-200/80 dark:bg-neutral-800/50'
          : 'bg-neutral-50 dark:bg-neutral-950 ',
      ]"
    >
      <div
        class="relative grid transition-all"
        :class="[
          uploadedFile !== null || hasErrorMessage
            ? 'scale-90 pt-2'
            : 'scale-100  pt-10',
        ]"
      >
        <input
          ref="fileInput"
          @change.prevent="onFileInputChanged"
          accept="text/csv"
          type="file"
          class="hidden"
        />
        <div
          class="absolute bottom-0 w-full px-10 pointer-events-none top-10"
          :class="[hasFileBeingDragged ? 'hidden' : '']"
        >
          <div class="relative">
            <TableImageDark
              v-if="themeStore.isDarkMode"
              class="w-full"
            />
            <TableImageLight
              v-if="!themeStore.isDarkMode"
              class="w-full"
            />
            <div
              class="h-28 w-[calc(100%+5px)] absolute -left-1 -bottom-1 bg-gradient-to-b from-neutral-100/5 to-neutral-50 dark:from-neutral-900/20 dark:to-neutral-950"
            ></div>
          </div>
        </div>
        <div class="z-10 px-10 mt-5 text-center font-inter">
          <h1 class="mb-2 font-semibold text-neutral-900 dark:text-neutral-200">
            Drag and drop a file here
          </h1>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            You can upload .csv files with max file size of 2MB
          </p>
          <Button
            type="button"
            @click="fileInput.click()"
            :variant="themeStore.isDarkMode ? 'secondary' : 'default'"
            class="mt-4"
            size="xs"
          >
            Choose a file
          </Button>
          <div class="flex items-center justify-center mt-2 space-x-4">
            <div
              class="h-[0.5px] w-12 bg-neutral-300 dark:bg-neutral-700/60"
            ></div>
            <span class="text-xs text-neutral-600 dark:text-neutral-500"
              >or</span
            >
            <div
              class="h-[0.5px] w-12 bg-neutral-300 dark:bg-neutral-700/60"
            ></div>
          </div>
          <div class="mt-2">
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              Download the import template below
            </p>
            <a
              class="text-xs font-semibold dark:text-white hover:underline"
              :href="props.importTemplateUrl"
              download
              >{{ props.importTemplateName }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <ImportFileCard
      v-if="uploadedFile"
      @file-removed="handleFileRemoved"
      :name="uploadedFile.name"
      :size="uploadedFile.size"
      :type="uploadedFile.type"
    />
    <CSVImportErrorMessage
      class="mt-4"
      v-if="hasErrorMessage"
      :message="errorMessage"
    />

    <CSVImportErrorMessage
      v-if="props.error"
      class="mt-4"
      :message="props.error"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Button from "@/components/ui/button/Button.vue";
import TableImageDark from "@/assets/svgs/TableImageDark.vue";
import TableImageLight from "@/assets/svgs/TableImageLight.vue";
import ImportFileCard from "@/components/forms/csv-import/ImportFileCard.vue";
import CSVImportErrorMessage from "@/components/forms/csv-import/CSVImportErrorMessage.vue";
import { useThemeStore } from "@/store/global/themeStore";

const props = defineProps({
  error: { type: String },
  importTemplateUrl: { type: String },
  importTemplateName: { type: String, default: "Import Template.csv" },
});

const themeStore = useThemeStore();

const fileInput = ref(null);

const uploadedFile = ref(null);
const errorMessage = ref("");

const hasImportFile = computed(() => uploadedFile.value !== null);

const hasErrorMessage = computed(() => {
  return errorMessage.value !== "";
});

const emit = defineEmits(["update:modelValue", "fileRemoved", "fileAdded"]);

const hasFileBeingDragged = ref(false);

function onDragOver(e) {
  hasFileBeingDragged.value = true;
}

function onDragLeave(e) {
  hasFileBeingDragged.value = false;
}

function onFileInputChanged(e) {
  let file = processFiles(e.target.files);
  emit("update:modelValue", file);
}

function onFileDrop(e) {
  let file = processFiles(e.dataTransfer.files);
  emit("update:modelValue", file);
}

function processFiles(files) {
  hasFileBeingDragged.value = false;
  uploadedFile.value = null;
  errorMessage.value = "";

  if (!isValidFile(files)) {
    return null;
  }

  let file = files[0];

  uploadedFile.value = {
    name: file.name,
    size: file.size,
    type: file.type,
  };

  emit("fileAdded");
  return file ?? null;
}

function isValidFile(files) {
  if (files.length !== 1) {
    errorMessage.value = "You cannot upload multiple files.";
    return false;
  }

  let file = files[0];

  if (file.type !== "text/csv") {
    errorMessage.value =
      "Invalid file format given. Only *.csv files are allowed.";
    return false;
  }
  if (file.size > 2 * 1024 * 1024) {
    errorMessage.value = "File size too large. File size must be 2MB or below.";
    return false;
  }

  return true;
}

function preventDefaults(e) {
  e.preventDefault();
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});

function handleFileRemoved() {
  fileInput.value.value = null;
  uploadedFile.value = null;
  emit("update:modelValue", null);
  emit("fileRemoved");
}

function resetField() {
  uploadedFile.value = null;
  errorMessage.value = "";
}

defineExpose({
  uploadedFile,
  resetField,
  hasImportFile,
});
</script>
