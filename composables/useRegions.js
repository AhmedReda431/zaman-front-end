import { ref } from "vue";

export const useRegions = () => {
  const { $api } = useNuxtApp();
  const regions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchRegions = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get("/regions");
      regions.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        "An error occurred while fetching regions.";
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchRegions,
    regions,
    loading,
    error,
  };
};
