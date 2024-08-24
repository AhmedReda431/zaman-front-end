import { ref } from "vue";

export const useHostOrders = () => {
    const { $api } = useNuxtApp();
    const orders = ref([]);
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

    // Fetch orders from the server
    const fetchOrders = async () => {
        resetStates();
        loading.value = true;

        try {
        const response = await $api.get(`/user/host-bookings`);
        orders.value = response.data.data;
        total.value = response.data.meta.total;
        success.value = true;
        } catch (err) {
        error.value = err.response?.data?.message || "host orders fetch error";
        } finally {
        loading.value = false;
        }
    };

return {
    fetchOrders,
    orders,
    total,
    loading,
    error,
    success,
};
};
