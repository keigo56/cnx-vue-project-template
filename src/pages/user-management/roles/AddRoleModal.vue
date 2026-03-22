<template>
  <Dialog :open="isOpen">
    <DialogContent class="sm:max-w-4xl">
      <DialogHeader>
        <DialogTitle>Add Role</DialogTitle>
        <DialogDescription>Add a new role to the system.</DialogDescription>
      </DialogHeader>
      <Form
        id="add_role_form"
        :data="formData"
        url="/api/datatable/roles/add"
        method="POST"
        class="space-y-4 mb-2"
        @on-success="successHandler"
        @on-form-validation-error="formValidationErrorHandler"
      >
        <div class="space-y-4">
          <InputField
            id="role_name"
            v-model="formData.name"
            type="text"
            label="Role Name"
            :error="formValidationErrors.name"
          />

          <div class="flex justify-between items-center border-b mb-3 pb-2">
            <label
              :class="[
                !!formValidationErrors.permissions
                  ? 'block text-sm font-medium text-red-900 dark:text-red-400'
                  : 'block text-sm font-medium text-gray-900 dark:text-white',
              ]"
            >
              Permissions
            </label>
            <Button
              variant="outline"
              type="button"
              size="sm"
              class="text-xs"
              @click="changeSelection()"
            >
              {{ allPermissionSelected ? 'Unselect All' : 'Select All' }}
            </Button>
          </div>

          <Tabs
            default-value="home_queue"
            class="w-full"
          >
            <div>
              <TabsList>
                <TabsTrigger
                  class="cursor-pointer"
                  value="home_queue"
                >
                  Home
                </TabsTrigger>
                <TabsTrigger
                  class="cursor-pointer"
                  value="candidate_list"
                >
                  Candidate List
                </TabsTrigger>
                <TabsTrigger
                  class="cursor-pointer"
                  value="candidate_details"
                >
                  Candidate Details
                </TabsTrigger>
                <TabsTrigger
                  class="cursor-pointer"
                  value="user_management"
                >
                  User Management
                </TabsTrigger>
                <TabsTrigger
                  class="cursor-pointer"
                  value="data_management"
                >
                  Data Management
                </TabsTrigger>
                <TabsTrigger
                  class="cursor-pointer"
                  value="audit_trail"
                >
                  Audit Trail
                </TabsTrigger>
              </TabsList>
            </div>

            <div class="mb-10 py-2 px-2 h-48">
              <TabsContent value="home_queue">
                <RolePermissionSelector
                  v-model="formData.permissions"
                  :permissions="getPermissionsByPrefixes(['home_queue'])"
                />
              </TabsContent>
              <TabsContent value="candidate_list">
                <RolePermissionSelector
                  v-model="formData.permissions"
                  :permissions="getPermissionsByPrefixes(['candidate_list'])"
                />
              </TabsContent>
              <TabsContent value="candidate_details">
                <RolePermissionSelector
                  v-model="formData.permissions"
                  :permissions="getPermissionsByPrefixes(['candidate_details'])"
                />
              </TabsContent>
              <TabsContent value="user_management">
                <RolePermissionSelector
                  v-model="formData.permissions"
                  :permissions="
                    getPermissionsByPrefixes(['users', 'roles', 'permissions'])
                  "
                />
              </TabsContent>
              <TabsContent value="data_management">
                <RolePermissionSelector
                  v-model="formData.permissions"
                  :permissions="getPermissionsByPrefixes(['data'])"
                />
              </TabsContent>
              <TabsContent value="audit_trail">
                <RolePermissionSelector
                  v-model="formData.permissions"
                  :permissions="getPermissionsByPrefixes(['audit_trail'])"
                />
              </TabsContent>
            </div>
          </Tabs>
          <p
            v-show="!!formValidationErrors.permissions"
            class="mt-4 text-xs text-red-600 dark:text-red-500 font-semibold"
          >
            {{
              !!formValidationErrors?.permissions
                ? formValidationErrors.permissions[0]
                : ''
            }}
          </p>
        </div>
      </Form>

      <DialogFooter>
        <Button
          variant="outline"
          @click="closeModal()"
        >
          Cancel
        </Button>
        <Button
          form="add_role_form"
          type="submit"
        >
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import Form from '@/components/forms/Form.vue';
import InputField from '@/components/forms/InputField.vue';
import { api } from '@/api/api.js';
import Button from '@/components/ui/button/Button.vue';
import RolePermissionSelector from './RolePermissionSelector.vue';

const isOpen = ref(false);

const formData = ref({
  name: '',
  permissions: [],
});

const allPermissionSelected = ref(false);

const permissions = ref([]);

const formValidationErrors = ref({});

onMounted(() => {
  getAllPermissions();
});

defineExpose({
  openModal,
  closeModal,
});

const emit = defineEmits(['success']);

function getAllPermissions() {
  api.get('/api/datatable/roles/get-permissions').then((response) => {
    permissions.value = response.data.permissions;
  });
}

const getPermissionsByPrefixes = (modulePrefixes, prefixesToStrip = []) => {
  // 1. Filter permissions based on module prefixes and strip names (logic remains the same)
  let processedPermissions = permissions.value.filter((permission) => {
    if (!permission || typeof permission.name !== 'string') {
      return false;
    }
    return modulePrefixes.some((prefix) => permission.name.startsWith(prefix));
  });

  processedPermissions = processedPermissions.map((permission) => {
    const matchingStripPrefix = prefixesToStrip.find((prefix) =>
      permission.name.startsWith(prefix),
    );

    if (matchingStripPrefix) {
      const newName = permission.name.substring(matchingStripPrefix.length);
      return {
        ...permission,
        name: newName,
      };
    }
    return permission;
  });

  // 2. Sort the processed array by 'id'
  processedPermissions.sort((a, b) => {
    return a.id - b.id;
  });

  // 3. Reorder the list for two-column, top-to-bottom grid display (The new step)
  const count = processedPermissions.length;
  if (count === 0) return [];

  // Calculate the size of the first column (always round up)
  const columnSize = Math.ceil(count / 2);

  const firstColumn = processedPermissions.slice(0, columnSize);
  const secondColumn = processedPermissions.slice(columnSize);

  const finalOrder = [];

  // Interleave the items: [Item 1, Item 1_Cont, Item 2, Item 2_Cont, ...]
  for (let i = 0; i < columnSize; i++) {
    // Add item from the first column
    finalOrder.push(firstColumn[i]);

    // Add item from the second column (if it exists)
    if (secondColumn[i]) {
      finalOrder.push(secondColumn[i]);
    }
  }

  return finalOrder;
};

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  resetForm();
  isOpen.value = false;
}

function resetForm() {
  formData.value = {
    name: '',
    permissions: [],
  };

  allPermissionSelected.value = false;
  formValidationErrors.value = {};
}

function successHandler() {
  toast.success('Success', {
    description: 'Added Role successfully',
  });

  closeModal();
  emit('success');
  resetForm();
}

function formValidationErrorHandler(errorResponse) {
  formValidationErrors.value = errorResponse.errors;
}

function changeSelection() {
  if (allPermissionSelected.value === false) {
    formData.value.permissions = permissions.value.map((item) => item.id);
    allPermissionSelected.value = true;
  } else {
    formData.value.permissions = [];
    allPermissionSelected.value = false;
  }
}
</script>
