export default defineNuxtRouteMiddleware((to, from) => {
  const {user, setRedirectRoute} = useAuthStore(); 
  if (from.path === "/join" && user?.role?.value !== "host") {
    setRedirectRoute('spaces/create');
    return navigateTo("/register");
  }
  else if (user?.role?.value !== "host") {
    setRedirectRoute(to.path);
    return navigateTo("/join");
  }
});
