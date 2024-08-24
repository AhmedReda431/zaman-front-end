import { ref } from "vue";
export const useNotifications = () => {
  const { $api } = useNuxtApp();
  const notifications = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const errors = ref([]);
  const success = ref(null);
  // Helper function to reset states
  const resetStates = () => {
    loading.value = false;
    error.value = null;
    errors.value = [];
    success.value = null;
  };

  const markAll = async (data) => {
    resetStates();
    loading.value = true;
    errors.value = [];

    try {
      const response = await $api.put("/notifications/mark-all");
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "notifications error";
      errors.value = err.response?.data?.errors || [];
    } finally {
      loading.value = false;
    }
  };


  const fetchNotifications = async () => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.get(`/notifications`);
      notifications.value = response.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "notifications fetch error";
    } finally {
      loading.value = false;
    }
  };

  return {
    markAll,
    fetchNotifications,
    errors,
    notifications,
    loading,
    error,
    success,
  };
};
