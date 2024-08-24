export default defineNuxtRouteMiddleware((to, from) => {
  const {user, setRedirectRoute} = useAuthStore(); 
  if (!user) {
    setRedirectRoute(to.path);
    return navigateTo("/register");
  } else if (user?.role?.value !== "guest") {
    setRedirectRoute(to.path);
    return navigateTo("/");
  }
});
