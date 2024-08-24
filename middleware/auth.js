export default defineNuxtRouteMiddleware((to, from, next) => {
  const authStore = useAuthStore(); // Access the auth store

  if (!authStore.isAuthenticated) {
    authStore.setRedirectRoute(to.path);
    return navigateTo("/login");
  }
});
