<script setup>
import { useForm, useIsFormValid, useValidateForm } from 'vee-validate';
import { ref, computed, onMounted, watch } from 'vue';
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
const { t, locale } = useI18n();
const { values } = useForm();
const validateForm = useValidateForm();
const isValid = useIsFormValid();
const emit = defineEmits(['valid', 'notValid']);
const { fetchCities, cities } = useCities();
const { fetchCategories, categories } = useCategories();
defineProps({
    serverErrors: {
        required: false
    },
    loading: {
        default: false
    }
})

const formData = ref({
    // price: '',
    // email: '',
    // city_id: '',
    // category_id: '',
    images: [],
    // // videos: [],
    plans: [],
    // description: '',
    // // whatsup: '',
    // // license_number: '',
    // // real_estate_characteristics: '',
    // depth: '',
    // water: 0,
    // electricity: 0,
    // // street_facing: '',
    // // street_area: '',
    // // number_of_streets: '',
    // // street: '',
    // land_area: '',
    // // number_of_council_rooms: '',
    // // hall_number: '',
})


const selectedFiles = ref([]);
const uploadedImages = ref([]);
const handleFileUpload = (event) => {
    // Append newly selected files to the existing selectedFiles array
    selectedFiles.value = [...selectedFiles.value, ...Array.from(event.target.files)];
    uploadImages();
};

const deleteImage = (index) => {
    uploadedImages.value.splice(index, 1);
    selectedFiles.value.splice(index, 1);
    formData.value.images.splice(index, 1);
};

const uploadImages = () => {
    formData.value.images = selectedFiles.value;
    uploadedImages.value = selectedFiles.value.map((file) => ({
        url: URL.createObjectURL(file),
    }));
};


// plans


const selectedFilesPlans = ref([]);
const uploadedImagesPlans = ref([]);
const handleFileUploadPlans = (event) => {
    // Append newly selected files to the existing selectedFilesPlans array
    selectedFilesPlans.value = [...selectedFilesPlans.value, ...Array.from(event.target.files)];
    uploadImagesPlans();
};

const deleteImagePlans = (index) => {
    uploadedImagesPlans.value.splice(index, 1);
    selectedFilesPlans.value.splice(index, 1);
    formData.value.images.splice(index, 1);
};

const uploadImagesPlans = () => {
    formData.value.plans = selectedFilesPlans.value;
    uploadedImagesPlans.value = selectedFilesPlans.value.map((file) => ({
        url: URL.createObjectURL(file),
    }));
};

const selectedLocation = ref(null);
const location = (data) => {
    selectedLocation.value = data;
};



const submit = async () => {
    await validateForm();
    if (isValid.value) {
        let formDataSend = new FormData()
        Object.entries(formData.value).forEach(([key, val]) => {
            if (typeof val == 'number' && (key != 'electricity' || key != 'water')) {
                formData.value[key] = String(val)
            }
            if (key != 'images' || key != 'plans') {
                formDataSend.append(key, val)
            }
            if (key == 'images' || key == 'plans') {
                for (let i = 0; i < val.length; i++) {
                    formDataSend.append(`${key}[${i}]`, val[i]);
                }
            }
        })
        console.log('formDataSend', formDataSend)
        emit('submit', formDataSend);
    }
};


onMounted(async () => {
    await fetchCities();
    await fetchCategories();
})




</script>

<template>
    <div class="bg-gray-100 p-10">
        <div class="  bg-white rounded-md">
            <div class=" border-gray-200  px-4 py-5 sm:px-6">
                <h3 class="text-base font-semibold leading-6 text-zaman-700">عرض العقار</h3>
            </div>
            <div class="p-4 sm:px-6">
                <!-- Details -->
                <div>
                    <h2 class="text-sm font-semibold leading-6 text-secondary">تفاصيل</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">المدينة</label>
                            <select v-model="formData.city_id"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option :value="null" selected disabled>اختر</option>
                                <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">نوع العقار</label>
                            <select v-model="formData.category_id"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option :value="null" selected disabled>اختر</option>
                                <option v-for="cat in categories" :value="cat.id">{{ cat.name }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">السعر</label>
                            <input v-model="formData.price" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">معلومات التواصل</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">رقم التواصل</label>
                            <input v-model="formData.phone" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">رقم الواتساب</label>
                            <input v-model="formData.whatsup" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                            <input v-model="formData.email" type="email"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-sm font-medium text-gray-700">اسم المسوق</label>
                            <input v-model="formData.marketerName" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">رقم ترخيص الهيئة العامة
                                للعقار</label>
                            <input v-model="formData.licenseNumber" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>

                <!-- Property Information -->
                <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">معلومات العقار</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">عدد غرف النوم</label>
                            <select v-model="formData.bedrooms"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option value="" disabled>اختر</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">عدد دورات المياه</label>
                            <select v-model="formData.bathrooms_of_rooms"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option value="" disabled>اختر</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">عدد الصاله</label>
                            <select v-model="formData.hall_number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option value="" disabled>اختر</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">عدد غرف المجلس</label>
                            <select v-model="formData.number_of_council_rooms"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option value="" disabled>اختر</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">مساحة الارض</label>
                            <input v-model="formData.land_area" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>

                <!-- Site and Street Information -->
                <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">معلومات الموقع والشارع</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">اسم الشارع</label>
                            <input v-model="formData.street" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">عدد الشوارع</label>
                            <select v-model="formData.number_of_streets"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option value="" disabled>اختر</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">عرض الشارع</label>
                            <input v-model="formData.street_area" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">واجهة الشارع</label>
                            <input v-model="formData.street_facing" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>

                <!-- Additional Information -->
                <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">معلومات اضافية</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">مياه</label>
                            <div class="mt-1 flex items-center space-x-4">
                                <label class="inline-flex items-center">
                                    <input v-model="formData.water" type="radio" :value="1" class="form-radio">
                                    <span class="mr-2 ml-8">نعم</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input v-model="formData.water" type="radio" :value="0" class="form-radio">
                                    <span class="mr-2">لا</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">كهرباء</label>
                            <div class="mt-1 flex items-center space-x-4">
                                <label class="inline-flex items-center">
                                    <input v-model="formData.electricity" type="radio" :value="1" class="form-radio">
                                    <span class="mr-2 ml-8">نعم</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input v-model="formData.electricity" type="radio" :value="0" class="form-radio">
                                    <span class="mr-2">لا</span>
                                </label>
                            </div>
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-sm font-medium text-gray-700">الطول</label>
                            <input v-model="formData.length" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-sm font-medium text-gray-700">العمق</label>
                            <input v-model="formData.depth" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>

                <!-- Features and Amenities -->
                <!-- <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">المميزات والمرافق</h2>
                    <div class="m-4">
                        <label class="block text-sm font-medium text-gray-700">المميزات والمرافق</label>
                        <input v-model="formData.formData.amenities" type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </div>
                </div> -->

                <!-- Property Description -->
                <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الوصف</h2>
                    <div class="m-4">
                        <label class="block text-sm font-medium text-gray-700">وصف العقار</label>
                        <textarea v-model="formData.description"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                    </div>
                </div>

                <!-- Images Section -->
                <!-- <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الصور</h2>
                    <div class="grid grid-cols-5 gap-4 mb-2 m-4">
                        <div v-for="n in 5" :key="n"
                            class="flex justify-center items-center bg-gray-100 h-40 rounded-lg">
                            <img src="" alt="Image Placeholder" class="w-8 h-8">
                        </div>
                    </div>
                    <p class="text-sm text-right text-orange-600 cursor-pointer">اضافة صور أخرى</p>
                </section> -->

                <!-- Multiple Image Upload Section -->
                <h2 class="text-sm font-semibold leading-6 text-secondary">الصور</h2>
                <div class="flex items-center justify-center w-full">
                    <!-- Button to trigger multiple image upload -->

                    <label for="multiple-image-upload"
                        class="flex justify-center items-center bg-gray-50 rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 border-2 border-gray-300 border-dashed">
                        <div class="flex flex-row items-center gap-5 justify-center px-2">
                            <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="text-sm text-gray-700">
                                <span class="font-semibold">{{ $t('addImages.addAdditionalImages') }}</span>
                            </p>
                        </div>
                        <input id="multiple-image-upload" @change="handleFileUpload" type="file" multiple
                            class="hidden" />
                    </label>
                </div>

                <div v-if="uploadedImages.length" class="grid gap-4 grid-cols-6">
                    <div v-for="(image, index) in uploadedImages" :key="index" class="relative">
                        <img :src="image.url" alt="Uploaded Image"
                            class="border-2 rounded m-2 w-64 object-cover  aspect-[4/3]" />
                        <button @click="deleteImage(index)"
                            class="absolute top-0 right-0 m-3 text-red-500 hover:text-red-700">
                            <Icon name="material-symbols:delete-forever-outline" />
                        </button>
                    </div>
                </div>

                <!-- Video Section -->
                <!-- <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الفيديو</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span> 
                        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                            <span>ارفاق فيديو</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 01-2.828 0L2.343 10.172M15.172 7H8.343l-4 4m4-4l6.586 6.586c.78.78 2.048.78 2.828 0l6.586-6.586">
                                </path>
                            </svg>
                        </button>
                    </div>
                </section> -->

                <!-- Location Section -->
                <!-- <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الموقع</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span> 
                        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                            <span>اضافة الموقع</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 11V7a4 4 0 10-8 0v4a8 8 0 1016 0V7a4 4 0 00-8 0z"></path>
                            </svg>
                        </button>
                    </div>
                </section> -->


                <!-- plans Image Upload Section -->
                <h2 class="text-sm font-semibold leading-6 text-secondary">المخطط</h2>
                <div class="flex items-center justify-center w-full">
                    <!-- Button to trigger plans image upload -->

                    <label for="multiple-image-plans-upload"
                        class="flex justify-center items-center bg-gray-50 rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 border-2 border-gray-300 border-dashed">
                        <div class="flex flex-row items-center gap-5 justify-center px-2">
                            <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="text-sm text-gray-700">
                                <span class="font-semibold">اضافة المخطط</span>
                            </p>
                        </div>
                        <input id="multiple-image-plans-upload" @change="handleFileUploadPlans" type="file" multiple
                            class="hidden" />
                    </label>
                </div>

                <div v-if="uploadedImagesPlans.length" class="grid gap-4 grid-cols-6">
                    <div v-for="(image, index) in uploadedImagesPlans" :key="index" class="relative">
                        <img :src="image.url" alt="Uploaded Image"
                            class="border-2 rounded m-2 w-64 object-cover  aspect-[4/3]" />
                        <button @click="deleteImagePlans(index)"
                            class="absolute top-0 right-0 m-3 text-red-500 hover:text-red-700">
                            <Icon name="material-symbols:delete-forever-outline" />
                        </button>
                    </div>
                </div>



                <!-- Plan Section -->
                <!-- <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">المخطط</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span>
                        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                            <span>اضافة المخطط</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 14l-7 7-7-7M5 10l7-7 7 7"></path>
                            </svg>
                        </button>
                    </div>
                </section> -->
            </div>
        </div>
        <button :class="{ 'cursor-not-allowed': loading, 'opacity-50': loading }" :disabled="loading"
            class=" my-5 w-full bg-zaman text-white px-3 py-2.5 rounded-md flex items-center justify-center"
            @click="submit">
            <span v-if="!loading">
                انشاء
            </span>
            <span v-if="loading">
                {{ $t('loading') }}
                <IconsLoadingWhite />
            </span>
        </button>
    </div>
</template>
