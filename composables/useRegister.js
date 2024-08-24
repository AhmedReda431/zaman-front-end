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

  const register = async (name, email, role, phone, password, avatar) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("phone", phone);
      formData.append("password", password);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await $api.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const authStore = useAuthStore();
      token.value = response.data.token;
      if(response?.data?.user){
        authStore.setToken(response?.data?.token);
        authStore.setUser(response?.data?.user);
      }
      router.push(authStore.redirectRoute || "/");
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
