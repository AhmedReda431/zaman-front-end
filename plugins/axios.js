import axios from "axios";
import { useCookie } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
  // const  { t, locale }  = useI18n()
  const config = useRuntimeConfig().public
  const tokenCookie = useCookie('token');
  const defaultUrl = config.VITE_NUXT_API_ENDPOINT || 'https://admin.zaman-sa.com/api';

  let api = axios.create({
    baseURL: defaultUrl,
  });

  // Watch for changes in the token cookie
  const unsubscribe = watch(tokenCookie, (newToken, oldToken) => {
    api.defaults.headers.common['lang'] = 'ar';
    if (newToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, { immediate: true });

  nuxtApp.hook('app:beforeUnmount', () => {
    unsubscribe();
  });

  return {
    provide: {
      api: api,
    },
  };
});
