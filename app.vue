<template>
  <Html :lang="locale" :dir="localeValue">
    <NuxtLayout>
      <LoadingScreen v-if="isLoading" />
      <NuxtPage :key="locale" />
      <transition name="page">
        <AlertComponent v-if="alert" :message="alert.message" :type="alert.type" @close="dismissAlert" />
      </transition>
    </NuxtLayout>
  </Html>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue';

const LOADING_TIMEOUT_DURATION = 150; // ms
const ALERT_DISPLAY_DURATION = 4500; // ms

const { locale, setLocale } = useI18n();
const localeValue = computed(() => {
  return locale.value === 'ar' ? 'rtl' : 'ltr';
});
const i18n = useCookie('i18n_redirected')
if(!i18n.value){
  setLocale('ar')
}



const isLoading = ref(false);

// Watch for changes in the locale
watch(locale, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    isLoading.value = true;
    nextTick(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, LOADING_TIMEOUT_DURATION);
    });
  }
});

const { onAlert } = useAlert();
const alert = ref(null);

onAlert((newAlert) => {
  showAlert(newAlert);
});

function showAlert(newAlert) {
  alert.value = newAlert;
  setTimeout(() => {
    dismissAlert();
  }, ALERT_DISPLAY_DURATION);
}

function dismissAlert() {
  alert.value = null;
}
</script>


<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.fade-enter-active, 
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from, 
.fade-leave-to 
/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
