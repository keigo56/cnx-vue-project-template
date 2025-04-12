<template>
  <div class="h-72">
    <CSVImportFieldForm
      :url="props.url"
      :importTemplateUrl="props.importTemplateUrl"
      :importTemplateName="props.importTemplateName"
      v-if="status === 'pending'"
      ref="csvImportFieldForm"
      @success="handleSuccess"
      @error="handleError"
    />
    <CSVImportFailedCard
      v-if="status === 'error'"
      :errors="errors.row_errors"
    />
    <CSVImportSuccessCard
      v-if="status === 'success'"
      :rows="numberOfRowsImported"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CSVImportFieldForm from "@/components/forms/csv-import/CSVImportFieldForm.vue";
import CSVImportFailedCard from "@/components/forms/csv-import/CSVImportFailedCard.vue";
import CSVImportSuccessCard from "@/components/forms/csv-import/CSVImportSuccessCard.vue";

const props = defineProps({
  url: { type: String },
  importTemplateUrl: { type: String },
  importTemplateName: { type: String, default: "Import Template.csv" },
});

const csvImportFieldForm = ref(null);
const loading = computed(() => csvImportFieldForm.value?.loading || false);
const hasImportFile = computed(
  () => csvImportFieldForm.value?.hasImportFile || false,
);

const status = ref("pending");
const errors = ref(null);
const numberOfRowsImported = ref(null);

const emit = defineEmits(["success", "error"]);

function handleSuccess(xNumberOfRowsImported) {
  status.value = "success";
  numberOfRowsImported.value = xNumberOfRowsImported;
  emit("success");
}

function handleError(xerrors) {
  status.value = "error";
  errors.value = xerrors;

  emit("error");
}

function resetForm() {
  status.value = "pending";
}

function startImport() {
  csvImportFieldForm.value.startImport();
}

defineExpose({
  resetForm,
  startImport,
  loading,
  status,
  hasImportFile,
});
</script>
