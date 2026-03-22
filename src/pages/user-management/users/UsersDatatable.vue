<template>
  <h1 class="mb-5 text-2xl font-semibold dark:text-white">
    Users
  </h1>

  <DataTable
    ref="usersDatatable"
    source-url="/api/datatable/users"
    :can-export="hasPermission('users_export')"
    export-url="/api/datatable/users/export"
    export-file-name="users.csv"
  >
    <template #actionItems>
      <Button
        v-if="hasPermission('users_add')"
        @click="addUserModal.openModal()"
      >
        <Plus class="w-5 h-5" />
        <span>Add User</span>
      </Button>
    </template>

    <template #rowActionItems="props">
      <a
        v-if="hasPermission('users_edit')"
        href="#"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        @click="editRow(props.row)"
      >
        Edit
      </a>
      <a
        v-if="hasPermission('users_delete')"
        href="#"
        class="font-medium text-red-600 dark:text-red-500 hover:underline"
        @click="deleteRow(props.row)"
      >
        Remove
      </a>
    </template>
  </DataTable>
  <AddUserModal
    ref="addUserModal"
    @success="usersDatatable.fetchData()"
  />
  <EditUserModal
    ref="editUserModal"
    @success="usersDatatable.fetchData()"
  />
  <DeleteUserModal
    ref="deleteUserModal"
    @success="usersDatatable.fetchData()"
  />
</template>

<script setup>
import DataTable from '@/modules/datatable/DataTable.vue';
import { Plus } from 'lucide-vue-next';
import AddUserModal from '@/pages/user-management/users/AddUserModal.vue';
import { ref } from 'vue';
import EditUserModal from '@/pages/user-management/users/EditUserModal.vue';
import DeleteUserModal from '@/pages/user-management/users/DeleteUserModal.vue';
import { hasPermission } from '@/utils/permission';
import Button from '@/components/ui/button/Button.vue';
const addUserModal = ref(null);
const editUserModal = ref(null);
const deleteUserModal = ref(null);
const usersDatatable = ref(null);

function editRow(row) {
  editUserModal.value.setData({
    email: row.email,
    role_id: row.role_id,
  });
  editUserModal.value.openModal();
}

function deleteRow(row) {
  deleteUserModal.value.setData({
    email: row.email,
  });
  deleteUserModal.value.openModal();
}
</script>
