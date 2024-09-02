import { ref } from "vue";
export const useLogin = () => {
  const router = useRouter();
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const { t } = useI18n();
  const loading = ref(false);
  const error = ref(null);
  const token = useCookie("token");
  const login = async (email, password) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.post("/auth/login", {
        email,
        password,
      });

      const authStore = useAuthStore();
      token.value = response.data.data.token;
      if(response?.data?.data?.user){
        authStore.setToken(response?.data?.data?.token);
        authStore.setUser(response?.data?.data?.user);
      }
      router.push(authStore.redirectRoute || "/");
    } catch (err) {
      error.value = err.response?.data.errors || t("errors.defaultLoginError");
    } finally {
      loading.value = false;
    }
  };

  return {
    login,
    loading,
    error,
  };
};
