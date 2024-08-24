import { ref } from "vue";

export const useUpdateUser = () => {
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const { t } = useI18n();
  const loading = ref(false);
  const error = ref(null);
  const errors = ref(null);
  const authStore = useAuthStore();

  const updateUser = async (userData) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      if (authStore.user.role.value == 'host') {
        userData.occupation ? formData.append("occupation", userData.occupation) : '';
        userData.company ? formData.append("company", userData.company) : '';
        userData.bio ? formData.append("bio", userData.bio) : '';
      }
      if (userData.avatar) {
        formData.append("avatar", userData.avatar);
      }

      const response = await $api.post("/user/update", formData);

      // Update the user data in the auth store
      authStore.setUser(response.data.user);

      // Handle any additional logic after a successful update
    } catch (err) {
      error.value =
        err.response?.data?.message || t("errors.defaultUpdateError");
      errors.value = err.response?.data?.errors || null;
    } finally {
      loading.value = false;
    }
  };

  return {
    updateUser,
    loading,
    error,
    errors
  };
};
