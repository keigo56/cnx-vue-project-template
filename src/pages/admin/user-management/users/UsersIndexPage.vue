<template>
  <BaseLayout>
    <div class="p-5">
      <UsersDatatable />
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import UsersDatatable from "@/pages/admin/user-management/users/UsersDatatable.vue";
</script>
