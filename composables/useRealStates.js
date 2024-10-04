import { ref } from "vue";

export const useRealStates = () => {
  const { $api } = useNuxtApp();
  const realStateStore = useRealStateStore();
  const {showAlert} = useAlert()
  const realStates = ref([]);
  const total = ref(0);
  const realState = ref({});
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

  // Fetch realStates from the server
  const fetchRealStates = async (query = {}) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.get(`/home-real-estates`, {
        params: query
      });
      realStates.value = response.data.data;
      total.value = response.data.meta.total;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "realStates fetch error";
    } finally {
      loading.value = false;
    }
  };

  const fetchUserRealStates = async () => {
    resetStates();
    loading.value = true;
    realStates.value = [];

    try {
      const response = await $api.get(`/user/real-states`);
      realStates.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "realStates fetch error";
      showAlert(error.value, 'danger')
    } finally {
      loading.value = false;
    }
  };

  // Fetch realState from the server
  const fetchRealState = async (id) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.get(`/home-real-estates/${id}`);
      realState.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "realState fetch error";
      showAlert(error.value, 'danger')

    } finally {
      loading.value = false;
    }
  };

  // Fetch realState from the server
  const fetchRealStateById = async (id) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.get(`/real-states/${id}`);
      realState.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "realState fetch by id error";
      showAlert(error.value, 'danger')

    } finally {
      loading.value = false;
    }
  };


  const newRealState = async (data) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.post("/real-estates", data);
      realState.value = response.data.data
      success.value = true;
    } catch (err) {
      errors.value = err.response?.data?.errors
      error.value = err.response?.data?.message || 'فشل انشاء العقار, يرجى اعادة المحاوله';
      showAlert(error.value, 'danger')

    } finally {
      loading.value = false;
    }
  };

  const updateRealState = async (data) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.put(
        `/real-states${realStateStore.isRealState ? `/${realStateStore.token}` : ""}`,
        data
      );
      realStateStore.setToken(response.data.data.token);
      realStateStore.setRealState(response.data.data);
      success.value = true;
    } catch (err) {
      errors.value = err.response?.data?.errors
      error.value = err.response?.data?.message || "realStates update error";
      showAlert(error.value, 'danger')

    } finally {
      loading.value = false;
    }

  };

  // const progress = ref(null);
  // const uploadImages = async (data) => {
  //   resetStates();
  //   loading.value = true;
  //   data.step = 3;
  //   try {
  //     const response = await $api.post(
  //       `/real-states${realStateStore.isRealState ? `/${realStateStore.token}` : ""}`,
  //       data,
  //       {
  //         onUploadProgress: (progressEvent) => {
  //           progress.value = Math.round(
  //             (progressEvent.loaded / progressEvent.total) * 100
  //           );
  //         },
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     realStateStore.setToken(response.data.data.token);
  //     realStateStore.setRealState(response.data.data);
  //     success.value = true;
  //   } catch (err) {
  //     errors.value = err.response?.data?.errors
  //     error.value = err.response?.data?.message || "error uploading images";
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  const deleteRealState = async (id) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.delete(`/real-states/${id}`);
      realStateStore.clearRealState();
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message;
      showAlert(error.value, 'danger')

    } finally {
      loading.value = false;
    }
  };

  return {
    fetchRealStates,
    fetchRealState,
    fetchRealStateById,
    newRealState,
    updateRealState,
    deleteRealState,
    fetchUserRealStates,
    total,
    realStates,
    realState,
    loading,
    error,
    errors,
    success,
  };
};
