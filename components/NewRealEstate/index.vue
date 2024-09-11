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
    }
})

const selectedLocation = ref(null);
const location = (data) => {
    selectedLocation.value = data;
};

const formData = ref({
    price: null,
    email: null,
    city_id: null,
    category_id: null,
    images: [],
    videos: [],
    plans: [],
    description: '',
    whatsup: '',
    license_number: null,
    real_estate_characteristics: null,
    depth: null,
    water: null,
    electricity: null,
    street_facing: null,
    street_area: null,
    number_of_streets: null,
    street: null,
    land_area: null,
    number_of_council_rooms: null,
    hall_number: null,
})


const validate = async () => {
    await validateForm();
    if (isValid.value) {
        emit('valid', formData.value);
    } else {
        emit('notValid')
    }
};

defineExpose({
    validate
});

watch(isValid, (value) => {
    if (value) {
        emit('valid', formData.value)
    }
})

const cityName = computed(() => {
    if (formData.value.city_id) {
        const obj = cities.value.find(cat => cat.id == formData.value.city_id);
        // return locale.value == "ar" ? unref(obj).name_ar : unref(obj).name;
        return unref(obj).name;
    }
    return "اختر المدينه";
});
const categoryName = computed(() => {
    if (formData.value.category_id) {
        const obj = categories.value.find(cat => cat.id == formData.value.category_id);
        // return locale.value == "ar" ? unref(obj).name_ar : unref(obj).name;
        return unref(obj).name;
    }
    return "اختر نوع العقار";
});
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
                                <option v-for="city in cities" :value="city.id" >{{ city.name }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">نوع العقار</label>
                            <select v-model="formData.category_id"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option :value="null" selected disabled>اختر</option>
                                <option v-for="cat in categories" :value="cat.id" >{{ cat.name }}</option>
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
                            <input v-model="contactNumber" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">رقم الواتساب</label>
                            <input v-model="whatsappNumber" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                            <input v-model="email" type="email"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-sm font-medium text-gray-700">اسم المسوق</label>
                            <input v-model="marketerName" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700">رقم ترخيص الهيئة العامة
                                للعقار</label>
                            <input v-model="licenseNumber" type="text"
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
                            <select v-model="bedrooms"
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
                            <select v-model="bathrooms"
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
                            <select v-model="livingRooms"
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
                            <select v-model="majlisRooms"
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
                            <input v-model="landArea" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>

                <!-- Site and Street Information -->
                <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">معلومات الموقع والشارع</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
                        <div class="md:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">اسم الشارع</label>
                            <input v-model="streetName" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">عدد الشوارع</label>
                            <select v-model="streetCount"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option value="" disabled>اختر</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">عرض الشارع</label>
                            <input v-model="streetWidth" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">واجهة الشارع</label>
                            <input v-model="streetFacade" type="text"
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
                                    <input v-model="water" type="radio" value="yes" class="form-radio">
                                    <span class="mr-2 ml-8">نعم</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input v-model="water" type="radio" value="no" class="form-radio">
                                    <span class="mr-2">لا</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">كهرباء</label>
                            <div class="mt-1 flex items-center space-x-4">
                                <label class="inline-flex items-center">
                                    <input v-model="electricity" type="radio" value="yes" class="form-radio">
                                    <span class="mr-2 ml-8">نعم</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input v-model="electricity" type="radio" value="no" class="form-radio">
                                    <span class="mr-2">لا</span>
                                </label>
                            </div>
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-sm font-medium text-gray-700">الطول</label>
                            <input v-model="length" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-sm font-medium text-gray-700">العمق</label>
                            <input v-model="depth" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>

                <!-- Features and Amenities -->
                <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">المميزات والمرافق</h2>
                    <div class="m-4">
                        <label class="block text-sm font-medium text-gray-700">المميزات والمرافق</label>
                        <input v-model="amenities" type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </div>
                </div>

                <!-- Property Description -->
                <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الوصف</h2>
                    <div class="m-4">
                        <label class="block text-sm font-medium text-gray-700">وصف العقار</label>
                        <textarea v-model="description"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                    </div>
                </div>

                <!-- Images Section -->
                <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الصور</h2>
                    <div class="grid grid-cols-5 gap-4 mb-2 m-4">
                        <div v-for="n in 5" :key="n"
                            class="flex justify-center items-center bg-gray-100 h-40 rounded-lg">
                            <img src="" alt="Image Placeholder" class="w-8 h-8">
                        </div>
                    </div>
                    <p class="text-sm text-right text-orange-600 cursor-pointer">اضافة صور أخرى</p>
                </section>

                <!-- Video Section -->
                <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الفيديو</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span> <!-- Empty span to take space -->
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
                </section>

                <!-- Location Section -->
                <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الموقع</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span> <!-- Empty span to take space -->
                        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                            <span>اضافة الموقع</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 11V7a4 4 0 10-8 0v4a8 8 0 1016 0V7a4 4 0 00-8 0z"></path>
                            </svg>
                        </button>
                    </div>
                </section>


                <!-- Plan Section -->
                <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">المخطط</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span> <!-- Empty span to take space -->
                        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                            <span>اضافة المخطط</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 14l-7 7-7-7M5 10l7-7 7 7"></path>
                            </svg>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
