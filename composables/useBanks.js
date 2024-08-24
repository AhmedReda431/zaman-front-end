import { ref } from "vue";
export const useBanks = () => {
  const { $api } = useNuxtApp();
  const banks = ref([]);
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

  const newBank = async (data) => {
    resetStates();
    loading.value = true;
    errors.value = [];

    try {
      const response = await $api.post("/user/banks", data);
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "payment create error";
      errors.value = err.response?.data?.errors || [];
    } finally {
      loading.value = false;
    }
  };


  const fetchBanks = async () => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.get(`/user/banks`);
      banks.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "banks fetch error";
    } finally {
      loading.value = false;
    }
  };

  const deleteBank = async (id) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.delete(`/user/banks/${id}`);
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    newBank,
    fetchBanks,
    deleteBank,
    errors,
    banks,
    loading,
    error,
    success,
  };
};
