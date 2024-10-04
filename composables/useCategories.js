import { ref } from "vue";

export const useCategories = () => {
  const { $api } = useNuxtApp();
  const {showAlert} = useAlert()
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get("/states");
      categories.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.data?.message ||
        "An error occurred while fetching categories.";
        showAlert(error.value, 'danger')

    } finally {
      loading.value = false;
    }
  };

  return {
    fetchCategories,
    categories,
    loading,
    error,
  };
};
