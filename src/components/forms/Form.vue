<template>
  <form
    @submit.prevent="submit()"
    class="border-0 border-transparent"
  >
    <slot />
  </form>
</template>
<script setup>
import { api } from "@/api/api.js";
import { ref } from "vue";
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  url: {
    type: String,
    default: "",
  },
  method: {
    type: String,
    default: "GET",
  },

  multipart: {
    type: Boolean,
    default: false,
  },
});

const result = ref({});
const loading = ref(false);

const emit = defineEmits(["onSuccess", "onError", "onFormValidationError"]);

defineExpose({
  loading,
  submit,
});

async function submit() {
  loading.value = true;
  try {
    let headers = {};

    if (props.multipart) {
      headers["Content-Type"] = "multipart/form-data";
    }

    if (props.method === "GET") {
      result.value = await api.get(
        props.url,
        {
          params: props.data,
        },
        {
          headers: headers,
        },
      );
    } else if (props.method === "POST") {
      result.value = await api.post(props.url, props.data, {
        headers: headers,
      });
    } else if (props.method === "PUT") {
      result.value = await api.put(props.url, props.data, {
        headers: headers,
      });
    } else if (props.method === "DELETE") {
      result.value = await api.delete(
        props.url,
        {
          params: props.data,
        },
        {
          headers: headers,
        },
      );
    }
    loading.value = false;
    emit("onSuccess", result.value);
  } catch (error) {
    loading.value = false;
    if (error.code === "ERR_BAD_REQUEST") {
      if (error.response.status === 422) {
        return emit("onFormValidationError", error.response.data);
      }
      emit("onError", error);
    } else {
      return emit("onError", error);
    }
  }
}
</script>
