<template>
  <h1 class="mb-5 text-2xl font-semibold dark:text-white">Roles</h1>

  <DataTable
    source-url="/api/datatable/roles"
    :can-export="hasPermission('export_roles')"
    export-url="/api/datatable/roles/export"
    export-file-name="roles.csv"
    ref="rolesDatatable"
  >
    <template #actionItems>
      <button
        v-if="hasPermission('add_roles')"
        @click="addRoleModal.openModal()"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <PlusIcon class="w-4 h-4 mr-2 inline" />
        <span>Add Role</span>
      </button>
    </template>

    <template v-slot:rowActionItems="props">
      <a
        v-if="hasPermission('edit_roles')"
        @click="editRow(props.row)"
        href="#"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
      <a
        v-if="hasPermission('delete_roles')"
        @click="deleteRow(props.row)"
        href="#"
        class="font-medium text-red-600 dark:text-red-500 hover:underline"
      >
        Delete
      </a>
    </template>
  </DataTable>
  <AddRoleModal
    @success="rolesDatatable.fetchData()"
    ref="addRoleModal"
  />
  <EditRoleModal
    @success="rolesDatatable.fetchData()"
    ref="editRoleModal"
  />
  <DeleteRoleModal
    @success="rolesDatatable.fetchData()"
    ref="deleteRoleModal"
  />
</template>

<script setup>
import DataTable from "@/modules/datatable/DataTable.vue";
import { PlusIcon } from "@heroicons/vue/24/outline/index.js";
import AddRoleModal from "@/pages/admin/user-management/roles/AddRoleModal.vue";
import { ref } from "vue";
import EditRoleModal from "@/pages/admin/user-management/roles/EditRoleModal.vue";
import DeleteRoleModal from "@/pages/admin/user-management/roles/DeleteRoleModal.vue";
import { hasPermission } from "@/composable/checkPermission.js";

const addRoleModal = ref(null);
const editRoleModal = ref(null);
const deleteRoleModal = ref(null);
const rolesDatatable = ref(null);

function editRow(row) {
  editRoleModal.value.setData(row);
  editRoleModal.value.openModal();
}

function deleteRow(row) {
  deleteRoleModal.value.setData({
    id: row.id,
  });
  deleteRoleModal.value.openModal();
}
</script>
