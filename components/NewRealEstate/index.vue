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
    plans: null,
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
                <div>
                    <label class="text-sm font-semibold leading-6 text-secondary">
                        تفاصيل
                    </label>
                    <div class="mt-4 grid gap-4 grid-cols-3">
                        <!-- المدينه -->
                        <div class="flex flex-col">
                            <label class="text-sm font-medium text-stone-600">
                                المدينه
                            </label>
                            <Listbox v-model="formData.city_id">
                                <div class="relative mt-1">
                                    <ListboxButton
                                        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span class="block truncate">{{ cityName }}</span>
                                        <span
                                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition duration-100 ease-in"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                            <ListboxOption v-slot="{ active, selected }" v-for="city in cities"
                                                :key="city.name" :value="city.id" as="template">
                                                <li :class="[
                                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                                ]">
                                                    <span :class="[
                                                        selected ? 'font-medium' : 'font-normal',
                                                        'block truncate',
                                                    ]">{{ city.name }}</span>
                                                    <span v-if="selected"
                                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                                </div>
                            </Listbox>
                            <Field v-model="formData.city_id" class="hidden" name="city_id" />
                            <!-- <ErrorMessage class="text-[red] block mt-2" name="city_id" />
                            <p class="text-[red] block mt-2" v-if="serverErrors['city_id']"
                                v-text="serverErrors['city_id'][0]">
                            </p> -->
                        </div>
                        <!-- نوع العقار  -->
                        <div class="flex flex-col">
                            <label class="text-sm font-medium text-stone-600">
                                نوع العقار
                            </label>
                            <Listbox v-model="formData.category_id">
                                <div class="relative mt-1">
                                    <ListboxButton
                                        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span class="block truncate">{{ categoryName }}</span>
                                        <span
                                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition duration-100 ease-in"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                            <ListboxOption v-slot="{ active, selected }" v-for="category in categories"
                                                :key="category.name" :value="category.id" as="template">
                                                <li :class="[
                                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                                ]">
                                                    <span :class="[
                                                        selected ? 'font-medium' : 'font-normal',
                                                        'block truncate',
                                                    ]">{{ category.name }}</span>
                                                    <span v-if="selected"
                                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                                </div>
                            </Listbox>
                            <Field v-model="formData.category_id" class="hidden" name="category_id" />
                            <!-- <ErrorMessage class="text-[red] block mt-2" name="category_id" />
                            <p class="text-[red] block mt-2" v-if="serverErrors['category_id']"
                                v-text="serverErrors['category_id'][0]">
                            </p> -->
                        </div>
                        <!-- السعر -->
                        <div class="flex flex-col">
                            <label class="text-sm font-medium text-stone-600">
                                السعر
                            </label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <Field type="number" name="price" v-model="formData.price"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <label class="text-sm font-semibold leading-6 text-secondary">
                        معلومات التواصل 
                    </label>
                    <div class="mt-4 grid gap-4 grid-cols-3">
                        <!-- الايميل -->
                        <div class="flex flex-col">
                            <label class="text-sm font-medium text-stone-600">
                                الايميل
                            </label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <Field type="text" name="email" v-model="formData.email"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <!-- الواتساب -->
                        <div class="flex flex-col">
                            <label class="text-sm font-medium text-stone-600">
                                الواتساب
                            </label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <Field type="text" name="whatsup" v-model="formData.whatsup"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>