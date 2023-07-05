<template>
  <form @submit.prevent="submit()" class="border-0 border-transparent">
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
});

const result = ref({});

const emit = defineEmits(["onSuccess", "onError", "onFormValidationError"]);

async function submit() {
  try {
    if (props.method === "GET") {
      result.value = await api.get(props.url, {
        params: props.data,
      });
    } else if (props.method === "POST") {
      result.value = await api.post(props.url, props.data);
    } else if (props.method === "PUT") {
      result.value = await api.put(props.url, props.data);
    } else if (props.method === "DELETE") {
      result.value = await api.delete(props.url, {
        params: props.data,
      });
    }
    await emit("onSuccess", result.value);
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      if (error.response.status === 422) {
        emit("onFormValidationError", error.response.data);
      }
    } else {
      emit("onError", error);
    }
  }
}
</script>
