import { ref } from "vue";

export const useGuestReservations = () => {
    const { $api } = useNuxtApp();
    const reservations = ref([]);
    const total = ref(0);
    const loading = ref(false);
    const error = ref(null);
    const success = ref(null);

    // Helper function to reset states
    const resetStates = () => {
        loading.value = false;
        error.value = null;
        success.value = null;
    };

    // Fetch reservations from the server
    const fetchReservations = async () => {
        resetStates();
        loading.value = true;

        try {
        const response = await $api.get(`/user/bookings`);
        reservations.value = response.data.data;
        total.value = response.data.meta.total;
        success.value = true;
        } catch (err) {
        error.value = err.response?.data?.message || "guest reseerveations fetch error";
        } finally {
        loading.value = false;
        }
    };

return {
    fetchReservations,
    reservations,
    total,
    loading,
    error,
    success,
};
};
