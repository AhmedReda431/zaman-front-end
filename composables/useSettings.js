import { ref } from "vue";
export const useSettings = () => {
  const { $api } = useNuxtApp();
  const notifications = ref([]);

  const loadingPassword = ref(false);
  const loadingNotifications = ref(false);
  const error = ref(null);
  const errors = ref([]);
  const updatePassword = async (formData) => {
    loadingPassword.value = true;
    error.value = null;
    errors.value = [];
    try {
      const response = await $api.post("/user/update-password", formData);
    } catch (err) {
      error.value =
        err?.response?.data?.message || "update password error";
        errors.value = err?.response?.data?.errors || [];
    } finally {
      loadingPassword.value = false;
    }
  };

  const updateNotifications = async (formData) => {
    loadingNotifications.value = true;
    error.value = null;
    errors.value = [];
    try {
      const response = await $api.post("/user/notification-settings", formData);
    } catch (err) {
      error.value =
        err?.response?.data?.message || "update notifications error";
        errors.value = err?.response?.data?.errors || [];
    } finally {
      loadingNotifications.value = false;
    }
  };

  const getNotifications = async (formData) => {
    error.value = null;
    try {
      const response = await $api.get("/user/notification-settings");
      notifications.value = response.data.data;
    } catch (err) {
      error.value =
        err?.response?.data?.message || "fetch notifications error";
    }
  };

  return {
    updatePassword,
    updateNotifications,
    getNotifications,
    errors,
    notifications,
    loadingNotifications,
    loadingPassword,
    error,
  };
};
