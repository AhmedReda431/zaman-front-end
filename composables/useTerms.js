import { ref } from "vue";

export const useTerms = () => {
  const { $api } = useNuxtApp();
  const terms = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchTerms= async ( params = {} ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get("/terms", { params });
      terms.value = response.data;
    } catch (err) {
      error.value =
        err.response?.message ||
        "An error occurred while fetching terms.";
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchTerms,
    terms,
    loading,
    error,
  };
};
