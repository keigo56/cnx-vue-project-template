<template>
  <BaseLayout>
    <div class="p-5">
      <PermissionsDatatable />
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import PermissionsDatatable from "@/pages/admin/user-management/permissions/PermissionsDatatable.vue";
</script>
