import { ref } from "vue";

export const useSpaces = () => {
  const { $api } = useNuxtApp();
  const spaceStore = useSpaceStore();
  const spaces = ref([]);
  const total = ref(0);
  const space = ref({});
  const parkings = ref([]);
  const amenities = ref([]);
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

  // Fetch spaces from the server
  const fetchSpaces = async (query = "") => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.get(`/spaces?${query}`);
      spaces.value = response.data.data;
      total.value = response.data.meta.total;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "spaces fetch error";
    } finally {
      loading.value = false;
    }
  };

  const fetchUserSpaces = async () => {
    resetStates();
    loading.value = true;
    spaces.value = [];

    try {
      const response = await $api.get(`/user/spaces`);
      spaces.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "spaces fetch error";
    } finally {
      loading.value = false;
    }
  };

  // Fetch space from the server
  const fetchSpace = async (id) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.get(`/spaces/${id}`);
      space.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "space fetch error";
    } finally {
      loading.value = false;
    }
  };

  // Fetch space from the server
  const fetchSpaceByToken = async (token) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.get(`/spaces/create/${token}`);
      space.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "space fetch by token error";
    } finally {
      loading.value = false;
    }
  };

  // Fetch parkings from the server
  const fetchParkings = async () => {
    resetStates();
    loading.value = true;
    try {
      const response = await $api.get("/space-features/parking");
      parkings.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value =
        err.response?.data?.message || "spaces fetch parkings error";
    } finally {
      loading.value = false;
    }
  };
  // Fetch amenities from the server
  const fetchAmenities = async () => {
    resetStates();
    loading.value = true;
    try {
      const response = await $api.get("/space-features/amenities");
      amenities.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value =
        err.response?.data?.message || "spaces fetch amenities error";
    } finally {
      loading.value = false;
    }
  };

  const newSpace = async (data) => {
    resetStates();
    loading.value = true;
    let obj = {}
    if (data){
      obj = {
        address: data.address,
        lng: String(data.map.lng),
        lat: String(data.map.lat),
        city: data.city,
        region_id: data.region_id
      };
    }
    try {
      const response = await $api.post("/spaces", obj);
      spaceStore.setToken(response.data.data.token);
      spaceStore.setSpace(response.data.data);
      space.value = response.data.data
      success.value = true;
    } catch (err) {
      errors.value = err.response?.data?.errors
      error.value = err.response?.data?.message || "spaces create error";
    } finally {
      loading.value = false;
    }
  };

  const updateSpace = async (data) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.put(
        `/spaces${spaceStore.isSpace ? `/${spaceStore.token}` : ""}`,
        data
      );
      spaceStore.setToken(response.data.data.token);
      spaceStore.setSpace(response.data.data);
      success.value = true;
    } catch (err) {
      errors.value = err.response?.data?.errors
      error.value = err.response?.data?.message || "spaces update error";
    } finally {
      loading.value = false;
    }

  };

  const progress = ref(null);
  const uploadImages = async (data) => {
    resetStates();
    loading.value = true;
    data.step = 3;
    try {
      const response = await $api.post(
        `/spaces${spaceStore.isSpace ? `/${spaceStore.token}` : ""}`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            progress.value = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      spaceStore.setToken(response.data.data.token);
      spaceStore.setSpace(response.data.data);
      success.value = true;
    } catch (err) {
      errors.value = err.response?.data?.errors
      error.value = err.response?.data?.message || "error uploading images";
    } finally {
      loading.value = false;
    }
  };

  const deleteSpace = async (id) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.delete(`/spaces/${id}`);
      spaceStore.clearSpace();
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchSpaces,
    fetchSpace,
    fetchSpaceByToken,
    newSpace,
    updateSpace,
    deleteSpace,
    fetchParkings,
    fetchAmenities,
    uploadImages,
    fetchUserSpaces,
    total,
    progress,
    amenities,
    parkings,
    spaces,
    space,
    loading,
    error,
    errors,
    success,
  };
};
