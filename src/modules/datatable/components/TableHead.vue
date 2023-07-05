<template>
  <thead
    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-neutral-950 dark:text-gray-400"
  >
    <TableRow>
      <TableHeading class="p-4" v-if="props.multiSelect">
        <div class="flex items-center">
          <input
            @click="changeSelectAll"
            v-model="selectPage"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </TableHeading>
      <TableHeading
        @click="selectColumn(column)"
        v-for="column in props.columns"
        :key="column.key"
        :class="[
          'px-6 py-3 cursor-pointer hover:bg-gray-100 hover:dark:bg-neutral-800',
          selectedColumn.key === column.key
            ? 'bg-gray-100 dark:bg-neutral-800'
            : '',
        ]"
      >
        <div :class="['flex justify-between items-center']">
          <span>{{ column.label }}</span>
          <ArrowUpIcon
            v-if="
              selectedColumn.key === column.key &&
              selectedColumn.direction === 'asc'
            "
            :class="['w-4 h-4']"
          />

          <ArrowDownIcon
            v-if="
              selectedColumn.key === column.key &&
              selectedColumn.direction === 'desc'
            "
            :class="['w-4 h-4']"
          />
        </div>
      </TableHeading>
      <TableHeading class="px-6 py-3 w-24" v-if="props.withActionItems">
        Actions
      </TableHeading>
    </TableRow>
  </thead>
</template>

<script setup>
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/vue/20/solid";
import TableRow from "@/modules/datatable/components/TableRow.vue";
import TableHeading from "@/modules/datatable/components/TableHeading.vue";
import { nextTick, ref, watch } from "vue";

const selectPage = ref(false);

const props = defineProps({
  columns: Array,
  config: {
    type: Array,
    default: [],
  },
  multiSelect: {
    type: Boolean,
    default: false,
  },
  withActionItems: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["sortColumn", "selectAllChanged"]);

const selectedColumn = ref({
  key: "",
  direction: "asc",
});

defineExpose({
  unselectAll,
  selectAll,
  setDefaultSort,
});

function selectColumn(column) {
  if (selectedColumn.value.key !== column.key) {
    selectedColumn.value = {
      key: column.key,
      direction: "asc",
    };

    emit("sortColumn", selectedColumn.value);
    return;
  }

  if (
    selectedColumn.value.key === column.key &&
    selectedColumn.value.direction === "desc"
  ) {
    selectedColumn.value = {
      key: "",
      direction: "asc",
    };
    emit("sortColumn", selectedColumn.value);
    return;
  }

  selectedColumn.value = {
    key: column.key,
    direction: selectedColumn.value.direction === "asc" ? "desc" : "asc",
  };
  emit("sortColumn", selectedColumn.value);
}

function unselectAll() {
  selectPage.value = false;
}

function selectAll() {
  selectPage.value = true;
}

function changeSelectAll() {
  emit("selectAllChanged", !selectPage.value);
}

function setDefaultSort(sortData) {
  selectedColumn.value = sortData;
}
</script>
