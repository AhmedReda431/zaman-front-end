import { ref } from "vue";
export const useContactUs = () => {
  const router = useRouter();
  const { $api } = useNuxtApp();
  const { t } = useI18n();
  const loading = ref(false);
  const error = ref(null);
  const errors = ref(null);
  const send = async (data) => {
    loading.value = true;
    error.value = null;
    errors.value = null;

    try {
      const response = await $api.post("/contacts", data);
      
      // router.push(authStore.redirectRoute || "/");
    } catch (err) {
      errors.value = err.response?.data.errors || t("errors.defaultLoginError");
    } finally {
      loading.value = false;
    }
  };

  return {
    send,
    loading,
    error,
    errors,
  };
};
