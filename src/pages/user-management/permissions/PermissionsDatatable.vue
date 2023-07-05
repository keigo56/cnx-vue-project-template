<template>
  <h1 class="mb-5 text-2xl font-semibold dark:text-white">Permissions</h1>

  <DataTable
    source-url="/api/datatable/permissions"
    :can-export="hasPermission('export_permissions')"
    export-url="/api/datatable/permissions/export"
    export-file-name="permissions.csv"
    :with-action-items="false"
  />
</template>

<script setup>
import DataTable from "@/modules/datatable/DataTable.vue";
import { hasPermission } from "@/composable/checkPermission.js";
</script>
