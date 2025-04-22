<template>
  <div class="p-5 h-full">
    <h1 class="mb-5 text-2xl font-semibold dark:text-white">Homepage</h1>
    <div class="grid grid-cols-3 gap-5 mb-5">
      <Card class="h-52 bg-secondary/40 dark:border-none"> </Card>
      <Card class="h-52 bg-secondary/40 dark:border-none"> </Card>
      <Card class="h-52 bg-secondary/40 dark:border-none"> </Card>
    </div>
    <Card class="h-100 bg-secondary/40 dark:border-none"> </Card>
  </div>
</template>
<script setup>
import Card from "@/components/ui/card/Card.vue";
</script>
