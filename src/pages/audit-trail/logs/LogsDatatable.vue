<template>
  <h1 class="mb-5 text-2xl font-semibold dark:text-white">Logs</h1>

  <DataTable
    source-url="/api/datatable/audit-trail/logs"
    export-url="/api/datatable/audit-trail/logs/export"
    export-file-name="logs.csv"
    :with-action-items="false"
    :can-export="hasPermission('export_logs')"
    ref="logsDatatable"
  >
  </DataTable>
</template>

<script setup>
import DataTable from "@/modules/datatable/DataTable.vue";
import { onMounted, ref } from "vue";
import { hasPermission } from "@/utils/permission";

const logsDatatable = ref(null);

onMounted(() => {
  logsDatatable.value.setDefaultSort({
    key: "activity_log_created_at",
    direction: "desc",
  });
});
</script>
