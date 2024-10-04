// composables/useVerify.js
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth"; // Make sure to import the auth store

export const useVerify = () => {
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const { t } = useI18n();
  const router = useRouter(); // Use the router to redirect after registration
  const loading = ref(false);
  const error = ref(null);
  const token = useCookie("token"); // Access the cookie

  const verifyOtb = async (email,code ) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("code", code);

      const response = await $api.post("/auth/verify-otp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('response', response)
      const authStore = useAuthStore();
      if(response?.data?.data?.user){
        token.value = response?.data?.data?.token;
        authStore.setToken(response?.data?.data?.token);
        authStore.setUser(response?.data?.data?.user);
        router.push(authStore.redirectRoute || "/");
      }else if (response?.data?.message) {
        showAlert( typeof response?.data?.message == 'object' ? Object.values(response?.data?.message)[0] :response?.data?.message , 'warning',)
      }
    } catch (err) {
      error.value = err.response?.data.errors
      showAlert('something going wrong, please try again', 'danger')
      loading.value = false;
    } finally {
      loading.value = false;
    }
  };

  return {
    verifyOtb,
    loading,
    error,
  };
};
