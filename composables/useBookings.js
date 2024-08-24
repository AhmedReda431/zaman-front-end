import { ref } from "vue";
export const useBookings = () => {
  const { $api } = useNuxtApp();
  const bookStore = useBookStore();
  const bookings = ref([]);
  const booking = ref(null);
  const loading = ref(false);
  const loading_coupon = ref(false);
  const error = ref(null);
  const errors = ref(null);
  const errors_coupon = ref(null);
  const success = ref(null);
  // Helper function to reset states
  const resetStates = () => {
    loading.value = false;
    error.value = null;
    success.value = null;
  };

  const newBook = async (data) => {
    resetStates();
    loading.value = true;
    errors_coupon.value = null;
    loading_coupon.value = false;
    errors.value = null;
    error.value = null;


    try {
      const response = await $api.post("/bookings", data);
      bookStore.setToken(response.data.data.token);
      bookStore.setBook(response.data.data);
      booking.value = response.data.data;
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "book create error";
      errors.value = err.response?.data?.errors || null;
    } finally {
      loading.value = false;
    }
  };

  const doCoupon = async (data) => {
    resetStates();
    loading_coupon.value = true;
    try {
      const response = await $api.put(
        `/bookings/coupon/${bookStore.token}`,
        data
      );
      booking.value = response.data.data;
      bookStore.setToken(response.data.data.token);
      bookStore.setBook(response.data.data);
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "book update error";
      errors_coupon.value = err.response?.data?.errors || null;
    } finally {
      loading_coupon.value = false;
    }
  };

  const payCach = async (data) => {
    resetStates();
    loading.value = true;
    errors.value = null;

    try {
      const response = await $api.put(
        `/bookings/payment/${bookStore.token}`,
        data
      );
      bookStore.clearBook();

      const bookingToken = useCookie('booking.token');
      bookingToken.value = '';

      if (response.data.invoice_url) {
        window.location.href = response.data.invoice_url;
      }

      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message || "book pay error";
      errors.value = err.response?.data?.errors || null;
    } finally {
      loading.value = false;
    }
  };

  const fetchBookingByToken = async (token) => {
    resetStates();
    // loading.value = true;

    try {
      const response = await $api.get(`/bookings/create/${token}`);
      booking.value = response.data.data;
      bookStore.setToken(response.data.data.token);
      bookStore.setBook(response.data.data);
    } catch (err) {
      error.value = err.response?.data?.message || "booking fetch by token error";
    }
    // finally {
    //   loading.value = false;
    // }
  };


  const deleteBook = async (id) => {
    resetStates();
    loading.value = true;

    try {
      const response = await $api.delete(`/bookings/${id}`);
      bookStore.clearSpace();
      success.value = true;
    } catch (err) {
      error.value = err.response?.data?.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    newBook,
    doCoupon,
    payCach,
    deleteBook,
    fetchBookingByToken,
    bookings,
    booking,
    loading,
    loading_coupon,
    error,
    errors_coupon,
    errors,
    success,
  };
};
