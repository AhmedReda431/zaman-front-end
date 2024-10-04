import { ref } from "vue";

export const useCities = () => {
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const cities = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCities = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get("/cities");
      cities.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.data?.message ||
        "An error occurred while fetching cities.";
        showAlert(error.value, 'danger')
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchCities,
    cities,
    loading,
    error,
  };
};
