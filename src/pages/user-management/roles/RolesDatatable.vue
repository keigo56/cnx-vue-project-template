<template>
  <h1 class="mb-5 text-2xl font-semibold dark:text-white">
    Roles
  </h1>

  <DataTable
    ref="rolesDatatable"
    source-url="/api/datatable/roles"
    :can-export="hasPermission('roles_export')"
    export-url="/api/datatable/roles/export"
    export-file-name="roles.csv"
  >
    <template #actionItems>
      <Button
        v-if="hasPermission('roles_add')"
        @click="addRoleModal.openModal()"
      >
        <Plus class="w-5 h-5" />
        <span>Add Role</span>
      </Button>
    </template>

    <template #rowActionItems="props">
      <a
        v-if="hasPermission('roles_edit')"
        href="#"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        @click="editRow(props.row)"
      >
        Edit
      </a>
      <a
        v-if="hasPermission('roles_delete')"
        href="#"
        class="font-medium text-red-600 dark:text-red-500 hover:underline"
        @click="deleteRow(props.row)"
      >
        Delete
      </a>
    </template>
  </DataTable>
  <AddRoleModal
    ref="addRoleModal"
    @success="rolesDatatable.fetchData()"
  />
  <EditRoleModal
    ref="editRoleModal"
    @success="rolesDatatable.fetchData()"
  />
  <DeleteRoleModal
    ref="deleteRoleModal"
    @success="rolesDatatable.fetchData()"
  />
</template>

<script setup>
import DataTable from '@/modules/datatable/DataTable.vue';
import { Plus } from 'lucide-vue-next';
import AddRoleModal from '@/pages/user-management/roles/AddRoleModal.vue';
import { ref } from 'vue';
import EditRoleModal from '@/pages/user-management/roles/EditRoleModal.vue';
import DeleteRoleModal from '@/pages/user-management/roles/DeleteRoleModal.vue';
import { hasPermission } from '@/utils/permission';
import Button from '@/components/ui/button/Button.vue';
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
