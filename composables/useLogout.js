export const useLogout = () => {
  const router = useRouter(); // Use the router to redirect after logout
  const route = useRoute(); 
  const authStore = useAuthStore(); // Access the auth store
  const token = useCookie("token"); // Access the cookie
  const logout = () => {
    // Clear the authentication state
    token.value = null;
    authStore.clearAuth();
    if(route.fullPath.includes('profile')){
      router.push("/");
    }
  };

  return {
    logout,
  };
};
