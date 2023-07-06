<template>
  <BaseLayout>
    <div class="p-5">
      <LogsDatatable />
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import LogsDatatable from "@/pages/audit-trail/logs/LogsDatatable.vue";
</script>
