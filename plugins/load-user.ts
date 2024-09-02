export default defineNuxtPlugin(async (nuxtApp) => {
  const { $api } = useNuxtApp(); 
  const authStore = useAuthStore(); 

  // Only run this code on the client side
    const token = useCookie("token");

    if (token.value) {
      // Set the token in the auth store (and Axios headers if needed)
      authStore.setToken(token.value);
      $api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      try {
        // Fetch the user data from the /me endpoint
        const response = await $api.post("/profile-info");
        authStore.setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., clear auth data if token is invalid
        authStore.clearAuth();
      }
    }
});
