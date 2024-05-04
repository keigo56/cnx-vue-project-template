<template>
  <div class="w-full">
    <h1
      v-show="props.label !== ''"
      :class="[
        hasError || hasValidationError
          ? 'block mb-2 text-sm font-medium text-red-900 dark:text-red-500'
          : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
      ]"
    >
      {{ props.label }}
    </h1>
    <div
      v-show="files.length === 0"
      class="flex items-center justify-center w-full mb-4"
      @drop.prevent="onDrop"
    >
      <label
        for="dropzone-file-attachment"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          @change.prevent="onFileInputChanged"
          id="dropzone-file-attachment"
          accept="image/png, image/jpeg"
          type="file"
          class="hidden"
        />
      </label>
    </div>
    <div class="flex space-x-4">
      <div
        v-for="file in files"
        :key="file.name"
      >
        <div class="relative cursor-pointer">
          <div
            class="absolute w-36 h-36 bg-gray-900 opacity-0 top-0 hover:opacity-50 rounded-lg"
          >
            <div class="flex w-full h-full items-center justify-center">
              <span
                class="text-gray-100"
                @click="handleChangeClick"
                >Change</span
              >
            </div>
          </div>
          <img
            v-if="file.type === 'image/png' || file.type === 'image/jpeg'"
            class="w-36 h-36 rounded-lg"
            :src="getImageURL(file)"
            alt=""
          />
        </div>
      </div>
      <!-- <div class="w-36 h-36 border-2 border-gray-700 rounded-lg"></div> -->
    </div>
    <p
      v-show="hasError"
      class="mt-1 text-xs text-red-600 dark:text-red-500 font-semibold"
    >
      {{ errors[0] }}
    </p>

    <p
      v-show="hasValidationError"
      class="mt-1 text-xs text-red-600 dark:text-red-500 font-semibold"
    >
      {{ props.error[0] }}
    </p>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, defineEmits } from "vue";

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const errors = ref([]);
const files = ref([]);

function onFileInputChanged(e) {
  errors.value = [];
  files.value = e.target.files;
  emit("update:modelValue", e.target.files);
}

function onDrop(e) {
  if (props.multiple === false && e.dataTransfer.files.length > 1) {
    errors.value.push("Cannot add multiple files");
    return;
  }
  errors.value = [];
  files.value = e.dataTransfer.files;
  emit("update:modelValue", e.dataTransfer.files);
}

function preventDefaults(e) {
  e.preventDefault();
}

function getImageURL(file) {
  console.log(file);
  return URL.createObjectURL(file);
}

const handleChangeClick = () => {
  document.getElementById("dropzone-file-attachment").click();
};

const getFileSize = (sizeInBytes) => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(sizeInBytes) / Math.log(1024)));
  return Math.round(sizeInBytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

const hasError = computed(() => {
  return errors.value.length > 0;
});

const hasValidationError = computed(() => {
  return props.error.length > 0;
});

const events = ["dragenter", "dragover", "dragleave", "drop", "change"];

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
</script>
