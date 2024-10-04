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
      console.log(response?.data?.message)

      if (response?.data?.data?.code) {
        // authStore.setToken(response?.data?.token);
        // authStore.setUser(response?.data?.user);
        router.push({
          path: 'verify-code',
          query: {
            email: data.email
          }
        });
      }
      else if (response?.data?.message) {
        showAlert(typeof response?.data?.message == 'object' ? Object.values(response?.data?.message)[0] :response?.data?.message, 'warning',)
      }
    } catch (err) {
      console.log(err)
      showAlert('something going wrong, please try again', 'danger')
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
