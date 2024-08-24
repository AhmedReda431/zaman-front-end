

<script setup>
import { ref, computed } from 'vue';
import * as Yup from 'yup';
import defaultAvatar from '@/assets/img/green.png';

const { t } = useI18n();
const { showAlert } = useAlert();
const { updateUser, loading, error } = useUpdateUser();
const user = computed(() => useAuthStore().user);
const avatar = ref(null);
const imageToShow = ref(user.value?.avatar || defaultAvatar);
// Reactive user object with the current user's data

const formSchema = ref({
  fields: [
    {
      label: t('common.name'),
      name: 'name',
      as: 'input',
      placeholder: t('common.name'),
      rules: Yup.string().min(3, t('validation.name.minLength')).required(t('validation.name.required')),
    },
    {
      label: t('common.email'),
      name: 'email',
      as: 'input',
      class: 'text-gray-500',
      readonly: true,
      placeholder: '\u202Aexample@gmail.com',
      rules: Yup.string().email(t('validation.email.notValid')).required(t('validation.email.required')),
    },
    {
      label: t('common.phone'),
      name: 'phone',
      as: 'input',
      placeholder: '\u202A0X-XXXXXXXX',
      rules: Yup.string().matches(/(?:(?:\+?20)|(?:\+?966))?(?:\s|-)?(?:\d{3})(?:\s|-)?(?:\d{3})(?:\s|-)?(?:\d{4})/, t('validation.phone.notValid')).required(t('validation.phone.required')),
    },
  ],
});


const handleUpdate = async (data) => {
  if (avatar.value) {
    data.avatar = avatar.value;
  } else {
    data.avatar = null;
  }
  await updateUser(data);
  if (error.value) {
    showAlert(error.value, 'danger');
  }
};

const handleFileUpload = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    avatar.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageToShow.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>
<template>
  <div class="update-container">
    <!-- component -->
    <input id="avatar" class="hidden" type="file" @change="handleFileUpload" />
    <label for="avatar" class="block w-fit text-center ">
      <div class="relative w-16 h-16">
        <Icon class="absolute z-10 text-gray-500 bottom-0 left-0" name="jam:write" />
        <img class="w-16 h-16 rounded-full absolute" :src="imageToShow" alt="" />
        <div
          class="w-16 h-16 group hover:bg-gray-100 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
          <!-- Adjusted width and height here -->
          <img style="object-fit: cover;" class="hidden group-hover:block text-gray-400 w-6"
            src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
        </div>
      </div>
    </label>

    <DynamicForm :formValues="user" class="w-4/6 pt-6" :schema="formSchema" @submit="handleUpdate">
      <template #buttuns>
        <!--Submit button-->
        <div class="pt-6 text-center">

            <button v-if="!loading"
              class="mb-3 inline-block flex justify-center bg-zaman hover:bg-zaman-800 w-full rounded-md px-6 py-3 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
              type="submit" data-te-ripple-init data-te-ripple-color="light">
              {{ $t('save') }}
            </button>
            <button v-if="loading" :disabled="loading"
              class="mb-3 inline-block flex justify-center bg-zaman-700 w-full rounded-md px-6 py-3 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
              type="submit" data-te-ripple-init data-te-ripple-color="light">
              {{ $t('loading') }}
              <IconsLoadingWhite />
            </button>
        </div>
      </template>
    </DynamicForm>
  </div>
</template>