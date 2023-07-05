<template>
  <div>
    <div class="mb-3 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <input
          v-model="searchTerm"
          type="text"
          id="search_term"
          class="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-dark-100 dark:border-neutral-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
        <button
          @click="openFilterModal()"
          type="button"
          class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-800 dark:hover:text-white dark:hover:bg-neutral-700"
        >
          <FunnelIcon class="w-4 h-4 mr-2 inline" />
          <span>Filter</span>
        </button>
      </div>
      <!--
          Action Items
      -->
      <div class="flex items-center justify-evenly space-x-2">
        <button
          v-if="props.canExport"
          @click="exportItems()"
          type="button"
          class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-800 dark:hover:text-white dark:hover:bg-neutral-700"
        >
          <ArrowDownTrayIcon class="w-4 h-4 mr-2 inline" />
          <span>Export</span>
        </button>

        <slot name="actionItems"></slot>
      </div>
    </div>
    <Card>
      <div class="relative overflow-x-auto datatable">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <TableHead
            ref="tableHeading"
            :columns="visibleColumns"
            @sort-column="sortColumn"
            @select-all-changed="selectAllChanged"
            :multi-select="props.multiSelect"
            :with-action-items="props.withActionItems"
          />
          <tbody>
            <TableRow
              class="bg-gray-100 dark:bg-dark-100"
              v-if="
                !!datatableData.rows.data &&
                datatableData.rows.data.length === 0
              "
            >
              <TableData
                class="text-center py-5"
                :colspan="
                  datatableData.columns.length + (props.multiSelect ? 1 : 0)
                "
              >
                No record found
              </TableData>
            </TableRow>
            <TableRow
              v-for="(row, index) in datatableData.rows.data"
              :key="row['id']"
              class="bg-white border-b dark:bg-dark-900 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900"
            >
              <TableData class="w-4 px-4 py-3" v-if="props.multiSelect">
                <div class="flex items-center">
                  <input
                    v-model="selectedItems"
                    :value="row['id']"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-neutral-800"
                  />
                </div>
              </TableData>
              <TableData
                v-for="column in visibleColumns"
                :key="column.key"
                class="px-6 py-3 whitespace-nowrap"
              >
                {{ row[column.key] }}
              </TableData>
              <TableData
                class="px-6 py-3 flex items-center space-x-3"
                v-if="props.withActionItems"
              >
                <slot :row="row" name="rowActionItems"></slot>
              </TableData>
            </TableRow>
          </tbody>
        </table>
      </div>
      <div class="py-3 px-3 dark:bg-dark-900">
        <Pagination @change-page="changePage" :rows="datatableData.rows" />
      </div>
    </Card>
  </div>
  <FilterModal ref="filterModal" />
</template>

<script setup>
import { FunnelIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import Card from "@/modules/datatable/components/Card.vue";
import Pagination from "@/modules/datatable/components/Pagination.vue";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { api } from "@/api/api.js";
import TableHead from "@/modules/datatable/components/TableHead.vue";
import TableRow from "@/modules/datatable/components/TableRow.vue";
import TableData from "@/modules/datatable/components/TableData.vue";
import { watchDebounced } from "@vueuse/core";
import FilterModal from "@/modules/datatable/modals/FilterModal.vue";
import RowActionItem from "@/modules/datatable/components/RowActionItem.vue";

const props = defineProps({
  sourceUrl: String,
  exportUrl: {
    default: "/",
    type: String,
  },
  exportFileName: {
    default: "file.csv",
    type: String,
  },
  multiSelect: {
    type: Boolean,
    default: false,
  },
  withActionItems: {
    type: Boolean,
    default: true,
  },
  canExport: {
    type: Boolean,
    default: true,
  },
});

const datatableData = ref({
  columns: [],
  rows: [],
  config: [],
});

const currentPage = ref(1);

const columnForSorting = ref({
  key: "",
  direction: "",
});

const searchTerm = ref("");

const filterModal = ref(null);

const tableHeading = ref(null);

const selectedItems = ref([]);

const visibleColumns = computed(() => {
  return datatableData.value.columns.filter((item) => item.visible === true);
});

defineExpose({
  fetchData,
  setDefaultSort,
});

onMounted(() => {
  fetchData();
});

watch(currentPage, () => {
  fetchData();
});

watch(
  columnForSorting,
  () => {
    fetchData();
  },
  { deep: true }
);

watch(selectedItems, () => {
  for (let i = 0; i < datatableData.value.rows.data.length; i++) {
    let isInArray = selectedItems.value.includes(
      datatableData.value.rows.data[i]["id"]
    );
    if (!isInArray) {
      tableHeading.value.unselectAll();
      return;
    }
  }

  tableHeading.value.selectAll();
});

watchDebounced(
  searchTerm,
  () => {
    fetchData();
  },
  { debounce: 500, maxWait: 1000 }
);

function fetchData() {
  api
    .post(
      props.sourceUrl,
      {
        ...(columnForSorting.value.key !== "" && {
          sort_by: columnForSorting.value.key,
          sort_direction: columnForSorting.value.direction,
        }),
        ...(searchTerm.value !== "" && { search: searchTerm.value }),
      },
      {
        params: {
          page: currentPage.value,
        },
      }
    )
    .then((response) => {
      if (response.data.hasOwnProperty("datatable")) {
        datatableData.value = response.data.datatable;
      } else {
        console.log(
          "The response object does not contain a 'datatable' property."
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function changePage(pageNumber) {
  currentPage.value = pageNumber;
}

function selectAllChanged(isSelectAllChecked) {
  if (isSelectAllChecked) {
    datatableData.value.rows.data.forEach((item) => {
      selectedItems.value.push(item["id"]);
    });
    return;
  }

  //Remove IDS in the selected items
  datatableData.value.rows.data.forEach((item) => {
    selectedItems.value = selectedItems.value.filter((e) => e !== item["id"]);
  });
}

function sortColumn(column) {
  columnForSorting.value = column;
}

function openFilterModal() {
  filterModal.value.openModal();
}

function exportItems() {
  api
    .post(
      props.exportUrl,
      {
        ...(columnForSorting.value.key !== "" && {
          sort_by: columnForSorting.value.key,
          sort_direction: columnForSorting.value.direction,
        }),
        ...(searchTerm.value !== "" && { search: searchTerm.value }),
      },
      {
        responseType: "blob",
      }
    )
    .then((response) => {
      console.log(response);
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", props.exportFileName);
      document.body.appendChild(fileLink);

      fileLink.click();
      document.body.removeChild(fileLink);
    })
    .catch((error) => {
      console.error(error);
    });
}

function setDefaultSort(sortData) {
  columnForSorting.value = sortData;
  tableHeading.value.setDefaultSort(sortData);
}
</script>
