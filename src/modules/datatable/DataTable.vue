<template>
  <div class="w-full px-1 py-1">
    <div class="mb-3 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <input
          :disabled="isInitialLoad"
          v-show="withSearch"
          v-model="searchTerm"
          type="text"
          id="search_term"
          class="w-96 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-dark-100 autofill:text-gray-100 dark:border-neutral-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="[isInitialLoad && 'cursor-not-allowed']"
          placeholder="Search..."
        />
        <!-- <button
          @click="openFilterModal()"
          type="button"
          class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-800 dark:hover:text-white dark:hover:bg-neutral-700"
        >
          <FunnelIcon class="w-4 h-4 mr-2 inline" />
          <span>Filter</span>
        </button> -->
      </div>
      <!--
          Action Items
      -->
      <div class="flex items-center justify-evenly space-x-2">
        <slot name="actionItems"></slot>
        <button
          :disabled="isInitialLoad || exportLoading"
          v-if="props.canExport"
          @click="exportItems()"
          type="button"
          class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-neutral-900 dark:text-gray-400 dark:border-neutral-800 dark:hover:text-white dark:hover:bg-neutral-700 disabled:bg-gray-100 disabled:text-gray-500 disabled:dark:text-gray-500 disabled:hover:text-gray-500 dark:disabled:bg-gray-800 disabled:dark:hover:text-gray-500 disabled:cursor-not-allowed"
        >
          <ArrowDownTrayIcon
            v-show="!exportLoading"
            class="w-4 h-4 mr-2 inline"
          />
          <ArrowPathIcon
            v-show="exportLoading"
            class="w-4 h-4 mr-2 inline animate-spin"
          />
          <span>Export</span>
        </button>
      </div>
    </div>
    <Card>
      <div
        class="relative overflow-x-auto datatable min-h-[700px] dark:bg-zinc-900"
      >
        <div
          v-if="hasError"
          class="absolute top-0 left-0 w-full flex items-center justify-center pt-4 px-4 pointer-events-none"
        >
          <div class="bg-white dark:bg-dark-900">
            <div
              class="border border-red-700 dark:border-red-900 bg-red-100 dark:bg-red-900 dark:bg-opacity-50 px-2 py-2 rounded animation-shake"
            >
              <div class="flex items-center">
                <InformationCircleIcon
                  class="text-red-900 dark:text-red-400 w-4 h-4 mr-2"
                />
                <p class="text-red-900 dark:text-red-400 text-xs">
                  {{ errorMessage }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-show="
            isInitialLoad === true &&
            !props.autoFetch &&
            props.showLoading === true &&
            !isLoading
          "
          class="w-full h-[700px] flex justify-center items-center"
        >
          <div class="text-center">
            <div class="flex justify-center">
              <TableCellsIcon
                class="text-gray-400 w-16 h-16 mb-4 block dark:text-gray-700"
              />
            </div>
            <p class="text-gray-400 dark:text-gray-600 font-semibold">
              No data
            </p>
          </div>
        </div>
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
            :action-item-position="props.actionItemPosition"
            :show-loading="props.showLoading"
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
                  datatableData.columns.length +
                  (props.multiSelect ? 1 : 0) +
                  (props.withActionItems ? 1 : 0)
                "
              >
                No record found
              </TableData>
            </TableRow>
            <TableRow
              v-if="
                visibleColumns.length === 0 &&
                isLoading === true &&
                showLoading === true
              "
              v-for="row in 10"
              class="bg-white border-b dark:bg-dark-900 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900"
            >
              <TableData
                v-for="column in 5"
                class="px-6 py-3 whitespace-nowrap"
              >
                <div class="relative w-full h-full">
                  <span>
                    <span class="opacity-0">Loading...</span>
                    <div
                      class="absolute top-0 left-0 flex items-center w-full py-1.5"
                      :class="[
                        showLoading === true && isLoading === true
                          ? 'opacity-100'
                          : 'opacity-0',
                      ]"
                    >
                      <div class="animate-pulse w-full">
                        <div
                          class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                    </div>
                  </span>
                </div>
              </TableData>
            </TableRow>
            <TableRow
              v-for="(row, index) in datatableData.rows.data"
              :key="row['id']"
              class="bg-white border-b dark:bg-dark-900 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900"
            >
              <TableData
                class="w-4 px-4 py-3"
                v-if="props.multiSelect"
              >
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
                v-show="props.actionItemPosition === 'start'"
                class="px-6 py-3 flex items-center space-x-3"
                v-if="props.withActionItems"
              >
                <div class="relative w-full h-full">
                  <div
                    v-if="
                      showLoading === false ||
                      (showLoading === true && isLoading === false)
                    "
                  >
                    <slot
                      :row="row"
                      name="rowActionItems"
                    ></slot>
                  </div>

                  <p
                    v-if="showLoading === true && isLoading === true"
                    class="opacity-0"
                  >
                    Loading
                  </p>
                  <div
                    v-if="showLoading === true && isLoading === true"
                    class="absolute top-0 left-0 flex items-center w-full py-1.5"
                  >
                    <div class="animate-pulse w-full">
                      <div
                        class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"
                      ></div>
                    </div>
                  </div>
                </div>
              </TableData>

              <TableData
                v-for="column in visibleColumns"
                :key="column.key"
                class="px-6 py-3 whitespace-nowrap"
              >
                <div class="relative w-full h-full">
                  <span
                    class="text-gray-800 dark:text-gray-200"
                    :class="[
                      showLoading === false ||
                      (showLoading === true && isLoading === false)
                        ? 'opacity-100'
                        : 'opacity-0',
                    ]"
                  >
                    <slot
                      :row="row"
                      :column="column"
                      name="rowColumnData"
                    >
                      {{ row[column.key] }}
                    </slot>
                  </span>

                  <div
                    v-if="showLoading === true && isLoading === true"
                    :class="[
                      row[column.key] === '' || row[column.key] === null
                        ? 'h-[20px]'
                        : '',
                    ]"
                  >
                    <div class="opacity-100">
                      <div
                        class="absolute top-0 left-0 flex items-center w-full py-1.5"
                      >
                        <div class="animate-pulse w-full">
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TableData>

              <TableData
                v-show="props.actionItemPosition === 'end'"
                class="px-6 py-3 flex items-center space-x-3"
                v-if="props.withActionItems"
              >
                <div class="relative w-full h-full">
                  <div
                    :class="[
                      showLoading === false ||
                      (showLoading === true && isLoading === false)
                        ? 'opacity-100'
                        : 'opacity-0',
                    ]"
                  >
                    <slot
                      :row="row"
                      name="rowActionItems"
                    ></slot>
                  </div>

                  <div
                    v-if="showLoading === true && isLoading === true"
                    class="absolute top-0 left-0 flex items-center w-full py-1.5"
                  >
                    <div class="animate-pulse w-full">
                      <div
                        class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"
                      ></div>
                    </div>
                  </div>
                </div>
              </TableData>
            </TableRow>
          </tbody>
        </table>
      </div>
      <Pagination
        @change-page="changePage"
        :rows="datatableData.rows"
      />
    </Card>
  </div>
  <FilterModal ref="filterModal" />
</template>

<script setup>
import {
  TableCellsIcon,
  InformationCircleIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";
import Card from "@/modules/datatable/components/Card.vue";
import Pagination from "@/modules/datatable/components/Pagination.vue";
import { computed, onMounted, ref, watch, provide } from "vue";
import { api } from "@/api/api.js";
import TableHead from "@/modules/datatable/components/TableHead.vue";
import TableRow from "@/modules/datatable/components/TableRow.vue";
import TableData from "@/modules/datatable/components/TableData.vue";
import { watchDebounced } from "@vueuse/core";
import FilterModal from "@/modules/datatable/modals/FilterModal.vue";

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
    default: false,
  },
  actionItemPosition: {
    type: String,
    default: "end",
  },
  withSearch: {
    type: Boolean,
    default: true,
  },
  autoFetch: {
    type: Boolean,
    default: true,
  },
  showLoading: {
    type: Boolean,
    default: true,
  },
});

const provideAllProps = () => {
  let propsConvertedToArray = Object.entries(props);
  propsConvertedToArray.forEach((prop) => {
    provide(prop[0], prop[1]);
  });
};

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

const hasError = ref(false);
const errorMessage = ref("Something went wrong. Unable to load data.");

const visibleColumns = computed(() => {
  return datatableData.value.columns.filter((item) => item.visible === true);
});

const isInitialLoad = computed(() => {
  return datatableData.value.columns.length === 0;
});

defineExpose({
  fetchData,
  setDefaultSort,
});

onMounted(() => {
  if (props.autoFetch === true) {
    fetchData();
  }
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
    currentPage.value = 1;
    fetchData();
  },
  { debounce: 500, maxWait: 5000 }
);

function fetchData() {
  errorMessage.value = "Something went wrong. Unable to load data.";
  hasError.value = false;
  isLoading.value = true;
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
      hasError.value = true;
      datatableData.value.rows.data = [];
    })
    .then(() => {
      isLoading.value = false;
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

const exportLoading = ref(false);

function exportItems() {
  hasError.value = false;
  exportLoading.value = true;
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
      errorMessage.value = "Unable to export data. Something went wrong.";
      hasError.value = true;
    })
    .then(() => {
      exportLoading.value = false;
    });
}

function setDefaultSort(sortData) {
  columnForSorting.value = sortData;
  tableHeading.value.setDefaultSort(sortData);
}

const isLoading = ref(false);
provide("is-loading", isLoading);
provideAllProps();
</script>

<style>
.animation-shake {
  animation-delay: 1s;
  animation: shake 5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
}

@keyframes shake {
  1%,
  9% {
    transform: translate3d(-1px, 0, 0);
  }

  2%,
  8% {
    transform: translate3d(2px, 0, 0);
  }

  3%,
  5%,
  7% {
    transform: translate3d(-4px, 0, 0);
  }

  4%,
  6% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
