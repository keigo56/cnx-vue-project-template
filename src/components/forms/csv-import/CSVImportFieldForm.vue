<template>
  <Form
    ref="form"
    :data="formData"
    :url="props.url"
    method="POST"
    multipart
    @on-success="successHandler"
    @on-form-validation-error="formValidationErrorHandler"
  >
    <CSVImportField
      ref="importField"
      v-model="formData.file"
      :error="validationError"
      @file-removed="validationError = null"
      @file-added="validationError = null"
      :importTemplateUrl="props.importTemplateUrl"
      :importTemplateName="props.importTemplateName"
    />
  </Form>
</template>
<script setup>
import { ref, computed } from "vue";
import CSVImportField from "@/components/forms/csv-import/CSVImportField.vue";
import Form from "@/components/forms/Form.vue";

const props = defineProps({
  url: { type: String },
  importTemplateUrl: { type: String },
  importTemplateName: { type: String, default: "Import Template.csv" },
});

const formData = ref({
  file: null,
});

const emit = defineEmits(["success", "error"]);

const form = ref(null);
const loading = computed(() => form.value?.loading || false);
const hasImportFile = computed(() => importField.value?.hasImportFile || false);

const importField = ref(null);

const validationError = ref(null);

function resetForm() {
  formData.value = {
    file: null,
  };

  importField.value.resetField();
}

function successHandler(response) {
  emit("success", response.data.metadata.no_rows_imported);
}

function formValidationErrorHandler(errorResponse) {
  if (errorResponse.errors.row_errors !== undefined) {
    emit("error", errorResponse.errors);
    return;
  }

  validationError.value = errorResponse.message;
  importField.value.resetField();
}

function startImport() {
  form.value.submit();
}

defineExpose({
  resetForm,
  startImport,
  loading,
  hasImportFile,
});
</script>
