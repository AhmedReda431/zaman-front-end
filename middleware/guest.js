// middleware/guest.js
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore(); 

  if (authStore.isAuthenticated) {
    authStore.setRedirectRoute(to.path);
    return navigateTo("/");
  }
});
