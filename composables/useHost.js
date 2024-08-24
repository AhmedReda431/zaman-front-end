import { ref } from "vue";

export const useHost = () => {
  const { $api } = useNuxtApp();
  const data = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get(`/user/host-spaces/${id}`);
      data.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "An error occurred while fetching data.";
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchData,
    data,
    loading,
    error,
  };
};
