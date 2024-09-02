<script setup>
import { ref, onMounted } from 'vue';
const { space } = useSpaceStore();
const { t } = useI18n()
const selectedFiles = ref([]);
const uploadedImages = ref([]);
const errors = ref({
  main_image: null,
  images: null,
});
defineProps({
  serverErrors: {
    required: false
  }
})
const imagePreview = ref(null);
onMounted(() => {
  if (space?.images) {
    form.value.images = space.images;
    uploadedImages.value = space.images.map(image => {
      return {
        url: unref(image.md),
        name: image
      };
    });
  }
  form.value.main_image = space.main_image;
  imagePreview.value = space?.main_image || null;
});
let isValid = false
const form = ref({
  main_image: null,
  images: [],
});
const emit = defineEmits(['valid', 'notValid']);
const { uploadImages: upload, progress, error, loading } = useSpaces();
const { showAlert } = useAlert();

const handleFileUpload = (event) => {
  // Append newly selected files to the existing selectedFiles array
  selectedFiles.value = [...selectedFiles.value, ...Array.from(event.target.files)];
  uploadImages();
};

const handleMainImageUpload = (event) => {
  errors.value.main_image = null
  const file = event.target.files[0]; // Get the uploaded main image file
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    // Set the selected main image in formData
    form.value.main_image = file;

    // Generate a preview of the selected main image
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  img.src = URL.createObjectURL(file);
};

const uploadImages = () => {
  errors.value.images = null

  form.value.images = selectedFiles.value;
  uploadedImages.value = selectedFiles.value.map((file) => ({
    url: URL.createObjectURL(file),
  }));
};

const uploadToServer = async () => {
  if (!unref(isValid)) {
    if (imagePreview.value === null) {
      errors.value.main_image = t('validation.main_image');
      return;
    } if (uploadedImages.value.length == 0) {
      errors.value.images = t('validation.images');
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < form.value.images.length; i++) {
      formData.append(`images[${i}]`, toRaw(form.value.images)[i]);
    }
    formData.append('main_image', toRaw(form.value.main_image));
    formData.append('_method', 'PUT');
    formData.append('step', 3)
    await upload(formData);
    if (error.value) {
      return;
    }
    isValid = true
    form.value['step'] = 3
    emit('valid', form.value);
  }
};
const deleteImage = (index) => {
  uploadedImages.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
};
const validate = async () => {
  errors.value.main_image = null
  errors.value.images = null
  if (!unref(isValid) && imagePreview.value != null && uploadedImages.value.length != 0) {
    await uploadToServer()
  }
  else if (!unref(isValid) && (imagePreview.value == null || uploadedImages.value.length == 0)) {
    emit('notValid', 3)
    if (imagePreview.value === null) {
      errors.value.main_image = t('validation.main_image');
      return;
    } if (uploadedImages.value.length == 0) {
      errors.value.images = t('validation.images');
      return;
    }
    return;
  }
  else if (unref(isValid)) {
    form.value['step'] = 3
    emit('valid', form.value);
  } else {
    emit('notValid', 3)
  }
};

defineExpose({
  validate
});

watch(isValid, (value) => {
  if (value) {
    form.value['step'] = 3
    emit('valid', form.value);
  }
});


</script>
<template>
  <div class="border-b border-gray-900/10 pb-12">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{ $t('addImages.title') }}
      </h3>
      <p class="mt-1 text-sm text-gray-500">{{ $t('addImages.description') }}
      </p>
    </div>
    <div class="p-4 sm:px-6">

      <div class="text-gray-700">
        <div class="font-semibold">{{ $t('addImages.imageConditions') }}</div>
        <ul class="list-disc list-inside px-4 pt-2 pb-4 space-y-1">
          <li>{{ $t('addImages.conditions.resolution') }}</li>
          <li>{{ $t('addImages.conditions.noTrademark') }}</li>
          <li>{{ $t('addImages.conditions.noVertical') }}</li>
        </ul>
      </div>

      <!-- Main Image Upload Section -->
      <div class="flex items-center justify-center w-full">
        <!-- Display the preview of the selected main image -->
        <label v-if="form.main_image || space.main_image" class="my-4 flex justify-center bg-zaman-100 rounded p-1"
          for="main-image">
          <img :src="imagePreview" alt="Selected Image" class="max-w-xs max-h-40" />
        </label>
        <label v-else for="main-image"
          class="flex w-full h-40 flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">{{ $t('addImages.selectMainImage') }}</span>
            </p>
          </div>
        </label>
        <input id="main-image" @change="handleMainImageUpload" type="file" class="hidden" />
      </div>
      <div class="mx-auto w-full py-4">
        <span class="text-red-500 w-full flex justify-center mb-3" v-if="errors && errors['main_image']">{{
          errors['main_image'] }}</span>
          <span class="text-red-500 w-full flex justify-center mb-3" v-if="serverErrors['main_image']">{{
          serverErrors['main_image'][0] }}</span>
        <!-- Multiple Image Upload Section -->
        <div class="flex items-center justify-center w-full">
          <!-- Button to trigger multiple image upload -->
          <label for="multiple-image-upload"
            class="flex justify-center items-center bg-gray-50 rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 border-2 border-gray-300 border-dashed">
            <div class="flex flex-row items-center gap-5 justify-center px-2">
              <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="text-sm text-gray-700">
                <span class="font-semibold">{{ $t('addImages.addAdditionalImages') }}</span>
              </p>
            </div>
            <input id="multiple-image-upload" @change="handleFileUpload" type="file" multiple class="hidden" />
          </label>
        </div>

        <span class="text-red-500 mx-auto w-full flex justify-center" v-if="errors && errors['images']">{{
          errors['images'] }}</span>
          <span class="text-red-500 mx-auto w-full flex justify-center" v-if="serverErrors && serverErrors['images']">{{
          serverErrors['images'][0] }}</span>
        <!-- Display the preview of the selected additional images -->

      </div>

      <div v-if="uploadedImages.length" class="grid gap-4 grid-cols-6">
        <div v-for="(image, index) in uploadedImages" :key="index" class="relative">
          <img :src="image.url" alt="Uploaded Image" class="border-2 rounded m-2 w-64 aspect-auto" />
          <button @click="deleteImage(index)" class="absolute top-0 right-0 m-3 text-red-500 hover:text-red-700">
            <Icon name="material-symbols:delete-forever-outline" />
          </button>
        </div>
      </div>
      <div class="w-full flex justify-center items-center">
        <button type="button" @click="uploadToServer" :disabled="loading"
          class=" mt-10 rounded-md bg-zaman px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {{ $t('uploadFiles') }}
        </button>
      </div>
      <div v-if="progress !== null" class="flex-col mt-3 flex justify-center items-center w-full">
        <span class="text-gray-500">
          {{ progress }}%
        </span>
        <progress :class="{ 'custom-progress-bar w-2/3 mt-1': true, 'almost-complete': progress > 80 }" :value="progress"
          max="100"></progress>
      </div>
    </div>

  </div>
</template>
<style scoped>
.custom-progress-bar {
  /* Set the height of the progress bar */
  border-radius: 25px;
  overflow: hidden;
  height: 16px;

  /* Change the background color */
  background-color: #eee;

  /* Customize the color of the progress indicator */
  color: #4caf50;
  /* This will be used in browsers like Chrome */
}

/* For browsers that support it, you can style the progress value using pseudo-elements */
.custom-progress-bar::-webkit-progress-value {
  background-color: #4caf50;
}

.custom-progress-bar::-moz-progress-bar {
  background-color: #4caf50;
}

.custom-progress-bar::-webkit-progress-value {
  transition: width 0.5s ease;
}

.custom-progress-bar::-moz-progress-bar {
  transition: width 0.5s ease;
}

.almost-complete {
  color: #2a3dc6;
  /* Change to a yellow color when almost complete */
}

.almost-complete::-webkit-progress-value {
  background-color: #2a3dc6;
}

.almost-complete::-moz-progress-bar {
  background-color: #ffeb3b;
}
</style>