import { ref } from "vue";

export const useFavs = () => {
  const { $api } = useNuxtApp();
  const favs = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchFavs = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get("/user/fav-spaces");
      favs.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        "An error occurred while fetching favs.";
    } finally {
      loading.value = false;
    }
  };

  const toggleFav = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.post("/user/fav-spaces", {
        space_id: id
      });
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        "An error occurred while fetching favs.";
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchFavs,
    toggleFav,
    favs,
    loading,
    error,
  };
};
