<script setup>
import { Switch } from '@headlessui/vue';
import { ref, onMounted } from 'vue';
const { showAlert } = useAlert();
const { updatePassword, updateNotifications, getNotifications, notifications, errors, loadingPassword, loadingNotifications, error } = useSettings();
const current_password = ref('');
const password = ref('');
const password_confirmation = ref('');
const sms = ref(false);
const email = ref(false);
const application = ref(false);
const is_active = ref(false);
const toggleNotifications = () => {
  is_active.value = !is_active.value;
};

const changePassword = async () => {
  let formData = new FormData();
  formData.append('current_password', current_password.value);
  formData.append('password', password.value);
  formData.append('password_confirmation', password_confirmation.value);
  await updatePassword(formData);
  if (errors.value) {
    return;
  }
  current_password.value = '';
  password.value = '';
  password_confirmation.value = '';
};

const changeNotifications = async () => {
  let formData = {
    sms: sms.value,
    email: email.value,
    application: application.value,
    is_active: is_active.value
  };
  await updateNotifications(formData);
  if (error.value) {
    return;
  }
};

onMounted(async () => {
  await getNotifications();
  is_active.value = !!notifications.value[0].is_active;
  sms.value = !!notifications.value[0].sms;
  email.value = !!notifications.value[0].email;
  application.value = !!notifications.value[0].application;
})

</script>



<template>
  <div>
    <div>
      <div class=" w-full rounded-xl dark:border-gray-700 justify-items-end">
        <p class="text-xl font-bold pb-8 text-gray-700 dark:text-gray-200">{{$t('changePasswordTitle')}}</p>
        <div>
          <div class="mb-5">
            <label for="current-password" class="mb-3 block text-base font-medium text-gray-700">{{$t('currentPasswordLabel')}}</label>
            <input type="password" v-model="current_password" id="current-password" :placeholder="$t('currentPasswordPlaceholder')"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#53b7bb] focus:shadow-md" />
          </div>
          <span class="text-red-500" v-if="errors && errors['current_password']">{{$t('errors.current_password')}}</span>
          <div class="mb-5">
            <label for="new-password" class="mb-3 block text-base font-medium text-gray-700">{{$t('newPasswordLabel')}}</label>
            <input type="password" v-model="password" id="new-password" :placeholder="$t('newPasswordPlaceholder')"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#53b7bb] focus:shadow-md" />
          </div>
          <span class="text-red-500" v-if="errors && errors['password']">{{$t('errors.password')}}</span>
          <div class="mb-5">
            <label for="confirm-password" class="mb-3 block text-base font-medium text-gray-700">{{$t('confirmPasswordLabel')}}</label>
            <input type="password" v-model="password_confirmation" id="confirm-password" :placeholder="$t('confirmPasswordPlaceholder')"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#53b7bb] focus:shadow-md" />
          </div>
          <span class="text-red-500" v-if="errors && errors['password_confirmation']">{{$t('errors.password_confirmation')}}</span>
          <div >
            <button v-if="!loadingPassword" @click="changePassword"
              class="hover:shadow-form rounded-md mt-5 bg-zaman hover:bg-zaman-800 focus:bg-zaman-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">{{$t('updateButton')}}
            </button>
            <button v-if="loadingPassword" :disabled="loadingPassword"
              class="hover:shadow-form rounded-md mt-5 
              bg-zaman-700 
              focus:bg-zaman-700 py-3 px-8 text-center 
              text-base font-semibold text-white outline-none">
              {{ $t('loading') }}
              <IconsLoadingWhite />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class=" w-full border rounded-xl dark:border-gray-700 mt-12 p-5">
      <p class="text-xl font-bold py-3 text-gray-700 dark:text-gray-200">{{$t('notificationsSettingsTitle')}}</p>
      <div class="flex items-center mb-5">
        <Switch v-model="is_active"
          class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
          <span class="sr-only">
            {{$t('toggleNotifications')}}
          </span>
          <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white" />
          <span aria-hidden="true"
            :class="[is_active ? 'bg-indigo-600' : 'bg-gray-200', 'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out']" />
          <span aria-hidden="true"
            :class="[is_active ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out']" />
        </Switch>
        <label for="notificationsToggle" class="text-base font-medium text-gray-700 mx-2">{{$t('notificationsToggleLabel')}}</label>
      </div>
      <div v-if="is_active" class="mb-5 ms-3">
        <label class="block mb-2 text-base font-medium text-gray-700">{{$t('notificationMethodsLabel')}}</label>
        <div class="flex items-center">
          <input type="checkbox" id="application" v-model="application" class="mr-2 focus:outline-none" />
          <label for="application" class="text-base font-medium text-gray-700 mx-2">
            {{$t('applicationNotification')}}
          </label>
        </div>
        <div class="flex items-center my-2">
          <input type="checkbox" id="sms" v-model="sms" class="mr-2 focus:outline-none" />
          <label for="sms" class="text-base font-medium text-gray-700 mx-2">{{$t('smsNotification')}}
          </label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" id="email" v-model="email" class="mr-2 focus:outline-none" />
          <label for="email" class="text-base font-medium text-gray-700 mx-2">{{$t('emailNotification')}}
          </label>
        </div>
      </div>
      <div>
        <button v-if="!loadingNotifications" @click="changeNotifications"
          class="hover:shadow-form rounded-md mt-5 bg-zaman hover:bg-zaman-800 focus:bg-zaman-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">{{$t('saveButton')}}</button>
      </div>
      <button v-if="loadingNotifications" :disabled="loadingNotifications"
      class="hover:shadow-form rounded-md mt-5 
      bg-zaman-700 
      focus:bg-zaman-700 py-3 px-8 text-center 
      text-base font-semibold text-white outline-none">
      {{ $t('loading') }}
      <IconsLoadingWhite />
    </button>
    </div>

  </div>
</template>