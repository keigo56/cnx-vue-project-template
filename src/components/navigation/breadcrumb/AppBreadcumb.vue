<template>
  <Breadcrumb v-if="breadcrumbItems.length > 0">
    <BreadcrumbList>
      <template
        v-for="(item, index) in breadcrumbItems"
        :key="index"
      >
        <BreadcrumbItem>
          <BreadcrumbPage>{{ item }}</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < breadcrumbItems.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const breadcrumbItems = computed(() => {
  return route.meta.breadcrumb || [];
});
</script>
