<template>
  <div class="flex items-center justify-center h-screen bg-background">
    <div class="flex flex-col items-center mb-10">
      <img
        class="w-24 h-24 mb-3"
        src="/logo.png"
        alt=""
      />
      <p class="mb-1 text-xl font-semibold">
        Please wait for a moment
      </p>
      <p class="text-foreground/70">
        Logging you in...
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { getCookie } from '@/utils/cookies.js';
import { authService } from '@/services/authService';
import { toast } from 'vue-sonner';

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  let errorCode = route.query?.error;

  if (errorCode) {
    switch (errorCode) {
      case 'user_missing_role':
        toast.error('You do not have admin rights.', {
          description: 'Please contact your administrator.',
        });
        break;
      default:
        break;
    }
  }

  /*
   * Get the API Token from cookie, coming from the server
   * */
  const API_TOKEN = getCookie('azure_authorization');

  if (!API_TOKEN) {
    router.push({ path: '/login' });
    return;
  }

  await authService.validateToken(API_TOKEN);

  router.push({
    path: '/',
  });
});
</script>
