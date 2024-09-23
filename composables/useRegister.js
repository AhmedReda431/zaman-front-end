// composables/useRegister.js
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth"; // Make sure to import the auth store

export const useRegister = () => {
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const { t } = useI18n();
  const router = useRouter(); // Use the router to redirect after registration
  const loading = ref(false);
  const error = ref(null);
  const token = useCookie("token"); // Access the cookie

  const register = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.post("/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if(response?.data?.code ){
        // authStore.setToken(response?.data?.token);
        // authStore.setUser(response?.data?.user);
        router.push(`/verify-code?${data.email}`);
      }
    } catch (err) {
      error.value = err.response?.data.errors
      loading.value = false;
    } finally {
      loading.value = false;
    }
  };

  return {
    register,
    loading,
    error,
  };
};
