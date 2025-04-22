import { ref } from "vue";

export function useFilter() {
  const filters = ref([]);

  function addFilter(column, operation, value) {
    filters.value = [];
    filters.value.push({
      column: column,
      operation: operation,
      value: value,
    });
  }

  function setFilters(xfilters) {
    filters.value = xfilters;
  }

  return {
    filters,
    addFilter,
    setFilters,
  };
}
