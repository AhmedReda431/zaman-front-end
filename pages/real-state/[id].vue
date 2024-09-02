<script setup>
import defaultAvatar from '@/assets/img/green.png';
import { ref, onBeforeMount } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const date = ref();
const { user } = useAuthStore()
const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const { hmDuration } = useDate()
const { fetchSpace, space, loading, error, } = useSpaces()
const { newBook, error: book_error, loading: book_loading, booking, success, errors } = useBookings()
const images = ref([])
const formData = ref({
    space_id: null,
    booking_date: null,
    start_time: null,
    end_time: null,
    attend_count: null,
    additional_services: []
})
const categories = [
    { value: 'event_hall', label: t('categories.eventHalls') },
    { value: 'camps', label: t('categories.camps') },
    { value: 'events', label: t('categories.events') },
    { value: 'resting', label: t('categories.lounges') },
]
const getType = computed(() => {
    if (space.value.type) {
        const rawData = toRaw(space?.value?.type)
        const obj = categories.find(cat => cat.value == rawData.value)
        return obj.label;
    }
    return ''
})
const days = ref([])
const selectedLocation = ref(null)

const book = async () => {
    formData.value['space_id'] = space.value.id
    await newBook(formData.value)
    if (errors.value) {
        return
    }
    router.push(`/state/payment/${unref(booking).token}`)
}
const offDays = ref([])

onBeforeMount(async () => {
    await fetchSpace(route.params.id)
    images.value = space.value.images.map(image => {
        return unref(image.lg)
    })
    images.value.unshift(space.value.main_image)
    const lat = parseFloat(space.value.lat)
    const lng = parseFloat(space.value.lng)
    if (isNaN(lat) || isNaN(lng)) {
        selectedLocation.value = null
        return
    }
    selectedLocation.value = { lat, lng }
    days.value = space.value.working_hours[0].data
    offDays.value = days.value
        .filter(day => !day.is_open)
        .map(day => {
            switch (day.day) {
                case "sunday":
                    return 0;
                case "monday":
                    return 1;
                case "tuesday":
                    return 2;
                case "wednesday":
                    return 3;
                case "thursday":
                    return 4;
                case "friday":
                    return 5;
                case "saturday":
                    return 6;
                default:
                    return -1;
            }
        });
})
definePageMeta({
    title: "space",
    description: "the single space page description",
})

</script>

<template>
    <div>
        <transition name="fade">
            <div v-if="loading">
                <PageSkeletone />
            </div>
        </transition>
        <transition name="fade">
            <div class="flex flex-col justify-center items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-if="space && !loading">
                <SwiperComponent :slides="images" swiperClass="aspect-video w-full h-96 " :swiperNavigation="true">
                    <template #slide="{ slide }">
                        <div class="w-full h-full relative overflow-hidden ">

                            <img :src="slide" class="w-full h-full object-cover">
                        </div>
                    </template>
                </SwiperComponent>
                <div class=" mt-5 px-4">
                    <p class="uppercase tracking-wide text-2xl text-[#10069F] font-semibold">
                        {{ space.title }}
                    </p>
                    <div class="py-8 relative grid grid-cols-2 lg:grid-cols-4 gap-4 gap-x-12">
                        <div class="flex items-center gap-2 " style="min-width: max-content">
                            <Icon name="material-symbols:home-pin-outline" size="25" color="#10069F" />
                            <p class="block mt-1 text-lg leading-tight font-medium text-gray-600">
                                {{ locale == 'ar' ? space.region_ar : space.region }}
                            </p>
                        </div>
                        <div class="flex items-center gap-2 " style="min-width: max-content">
                            <Icon name="mdi:account-group" size="25" color="#10069F" />
                            <p class="block mt-1 text-lg leading-tight font-medium text-gray-600">
                                {{ space.max_attend }}
                            </p>
                        </div>
                        <div class="flex items-center gap-2 " style="min-width: max-content">
                            <Icon name="ph:clock-clockwise-fill" size="25" color="#10069F" />
                            <p class="block mt-1 text-lg leading-tight font-medium text-gray-600">
                                {{ space.hour_rate }} {{ t('common.SAR') }}
                            </p>
                        </div>
                        <div class="flex items-center gap-2 " style="min-width: max-content">
                            <Icon name="fluent:table-resize-column-16-regular" size="25" color="#10069F" />
                            <p class="block mt-1 text-lg leading-tight font-medium text-gray-600">{{ space.size +
                                $t('mSquare')
                            }} </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center w-full">
                    <div class="w-full">
                        <div class="flex w-full bg-white rounded-xl shadow-md p-10">
                            <div>
                                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                                    <div>
                                        <NuxtLink :to="`/host/${space?.host?.id}`" class="flex">
                                            <div class="flex-shrink-0">
                                                <img class="h-24 w-24 rounded-2xl" style="object-fit: cover;"
                                                    :src="space?.host?.avatar || defaultAvatar" alt="User avatar" />
                                            </div>
                                            <div class="p-8">
                                                <p class="uppercase tracking-wide text-lg text-zaman-500 font-semibold">
                                                    {{ $t('Host') }}
                                                </p>
                                                <p class="block mt-1 text-xl leading-tight font-medium text-black">
                                                    {{ space?.host?.name }}
                                                </p>
                                            </div>
                                        </NuxtLink>
                                        <hr class="my-4" />
                                        <div class="pt-4 ">
                                            <p class="uppercase tracking-wide text-2xl mb-5 text-gray-800 font-semibold">
                                                {{ getType }}
                                            </p>
                                            <p class="mt-2 text-gray-500">
                                                {{ space.description }}
                                            </p>
                                        </div>
                                        <hr class="my-4" />
                                        <p class="uppercase tracking-wide text-2xl mb-5 text-gray-800 font-semibold">
                                            {{ $t('spaceLaxuary') }}
                                        </p>
                                        <div class="grid gap-1 content-evenly md:grid-cols-2 sm:grid-cols-3 xs:grid-cols-2">
                                            <div v-for="item in space.amenities" :key="item.id"
                                                class="flex items-center justify-between mt-2 max-w-2xl px-8 py-2  border rounded-xl dark:border-gray-700">
                                                <div class="flex items-center ">
                                                    <Icon name="mdi:monitor" class="w-[25px] h-[25px] flex-shrink-0"
                                                        color="#86B6F6" />
                                                    <div class="flex flex-col mx-2 space-y-1">
                                                        <h2 class="text-sm  text-gray-700 dark:text-gray-200 min-w-max">
                                                            {{ locale == 'ar' ? item.name_ar : item.name }}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-4" />
                                        <div class="bg-white dark:bg-gray-900 gap-2">
                                            <p class="uppercase tracking-wide text-2xl mb-5 text-gray-800 font-semibold">
                                                {{ $t('spaceAdditionalServices') }}
                                            </p>
                                            <div v-for="service in space.additional_services" :key="service.id" class=" gap-2">
                                                <!-- Checkbox 1 -->
                                                <label :for="`service-${service.id}`"
                                                    class="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl dark:border-gray-700">
                                                    <div class="flex items-center ">
                                                        <input type="checkbox" v-model="formData.additional_services" :value="service.id"
                                                            class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                            :id="`service-${service.id}`"/>
                                                        <div class="flex flex-col mx-5 space-y-1">
                                                            <h2
                                                                class="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">
                                                                {{ service.title }}
                                                            </h2>
                                                            <h2 class="text-sm  text-gray-700 dark:text-gray-200">
                                                                {{ service.description }}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <h2
                                                        class="text-lg font-medium text-zaman-500 sm:text-2xl dark:text-gray-200">
                                                        {{ service.price }} {{ $t('common.SAR') }}</h2>
                                                </label>
                                            </div>
                                        </div>
                                        <hr class="my-4" />
                                        <div class="">
                                            <p class="uppercase tracking-wide text-2xl mb-5 text-gray-800 font-semibold">
                                            {{ $t('operatingHours') }}
                                            </p>
                                            <div v-for="day in days" :key="day.id">
                                                <div v-if="day.is_open"
                                                    class="flex mt-1 items-center justify-between  max-w-2xl px-8 py-2 border rounded-xl dark:border-gray-700">
                                                    <div class="flex justify-between w-full">
                                                        <h2 class=" font-medium text-gray-700  dark:text-gray-200">
                                                            {{ $t(`days.${day.day}`) }}
                                                        </h2>
                                                        <div class="flex" v-if="day.all_day">
                                                            <div class="flex items-center ">
                                                                <div class="flex flex-col mx-5 space-y-1">
                                                                    <h2
                                                                        class=" font-medium text-gray-700  dark:text-gray-200">
                                                                    {{ $t('wholeDay') }}
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="flex gap-4" v-else>
                                                            <div class="flex items-center ">
                                                                <div class="flex gap-2 space-y-1">
                                                                    <h2
                                                                        class=" font-medium text-gray-700  dark:text-gray-200">
                                                                        {{ day.from }}
                                                                    </h2>
                                                                    <!-- <h2 class="text-sm  text-gray-700 dark:text-gray-200">
                                                                        {{ $t('am') }}
                                                                    </h2> -->
                                                                </div>
                                                            </div>
                                                            <div class="flex items-center ">
                                                                <div class="flex gap-2 space-y-1">
                                                                    <h2
                                                                        class="font-medium text-gray-700  dark:text-gray-200">
                                                                        {{ day.to }}
                                                                    </h2>
                                                                    <!-- <h2 class="text-sm  text-gray-700 dark:text-gray-200">
                                                                        مساءا
                                                                    </h2> -->
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="user?.role?.value != 'host'"
                                        class="mx-auto w-full max-w-[550px] border rounded-lg dark:border-gray-700 p-5">
                                        <div>
                                            <p class=" tracking-wide text-lg mb-5 text-gray-800 font-semibold">
                                                {{ space.hour_rate }}
                                                {{ $t('common.SAR') }}
                                                / {{ $t('hour') }}</p>
                                            <div class="flex flex-wrap -mx-3 mb-5">
                                                <div class="w-full px-3 sm:w-1/1 mb-5">
                                                    <label for="date"
                                                        class="mb-3 block text-base font-medium text-[#07074D]">{{ $t('date') }}</label>
                                                    <VueDatePicker auto-apply :cancelText="$t('cancel')"
                                                        :selectText="$t('select')" :min-date="new Date()"
                                                        model-type="yyyy-MM-dd" v-model="formData.booking_date"
                                                        :enable-time-picker="false" :placeholder="$t('selectDate')"
                                                        :disabled-week-days="offDays" />
                                                    <span class="text-red-500" v-if="errors && errors['booking_date']">{{
                                                        errors['booking_date'][0] }}</span>

                                                    <!-- <input type="date" v-model="formData.booking_date" name="date" id="date"
                                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" /> -->
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <label for="time-from"
                                                        class="mb-3 block text-base font-medium text-[#07074D]">{{ $t('common.from') }}</label>
                                                    <input type="time" v-model="formData.start_time" name="time-from"
                                                        id="time-from"
                                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                                    <span class="text-red-500" v-if="errors && errors['start_time']">{{
                                                        errors['start_time'][0] }}</span>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <label for="time-to"
                                                        class="mb-3 block text-base font-medium text-[#07074D]">{{ $t('common.to') }}</label>
                                                    <input type="time" v-model="formData.end_time" name="time-to"
                                                        id="time-to"
                                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                                    <span class="text-red-500" v-if="errors && errors['end_time']">{{
                                                        errors['end_time'][0] }}</span>
                                                </div>
                                            </div>
                                            <div class="mb-5">
                                                <label for="guest"
                                                    class="mb-3 block text-base font-medium text-[#07074D]">
                                                    {{ $t('attends') }}
                                                    
                                                    
                                                </label>
                                                <input type="number" v-model="formData.attend_count" placeholder="0" min="0"
                                                    class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                                    <span class="text-red-500" v-if="errors && errors['attend_count']">{{
                                                        errors['attend_count'][0] }}</span>
                                                </div>
                                            <p class="text-sm text-zaman-500 dark:text-gray-200"> {{ $t('minTime') }} : {{ hmDuration(space.min_booking_period) }}
                                                
                                            </p>
                                            <div class="flex flex-col items-center">
                                                <button @click="book()"
                                                    :class="{ 'cursor-not-allowed': book_loading, 'opacity-50': book_loading }"
                                                    :disabled="book_loading"
                                                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

                                                    <span v-if="!book_loading">
                                                        {{ $t('steps.continue') }}

                                                    </span>
                                                    <span v-if="book_loading">
                                                        {{ $t('loading') }}
                                                        <IconsLoadingWhite />
                                                    </span>
                                                </button>
                                                <p class="py-2 text-xl text-[#07074D]">
                                                    {{ $t('cancellationPolicy.cancellationAbility') }}

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div>
                                    <p v-if="space.rules != '' || space.rules != null"
                                        class="uppercase tracking-wide text-2xl mb-5 text-gray-800 font-semibold">
                                        {{ $t('spaceRules') }}
                                    </p>

                                    <p class="mt-2 text-gray-500">
                                        {{ space.rules }}
                                    </p>
                                </div>
                                <hr class="my-4" />
                                <hr class="my-4" />
                                <div>
                                    <p class="flex justify-between tracking-wide text-xl mb-5 text-gray-800 font-semibold">
                                        <span>
                                            {{$t('common.location')}}
                                        </span>
                                        <span class="text-zaman hover:text-zaman-700 " v-if="selectedLocation">
                                            <a :href="`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`" target="_blank">
                                            {{ $t('showOnMap') }}
                                            </a>
                                        </span>
                                    </p>
                                    <div class="aspect-video w-full h-full rounded-md overflow-hidden">
                                        <MapSelect :selected="selectedLocation" :disable-select="true" />
                                    </div>
                                </div>
                                <hr class="my-4" />

                                <p class="uppercase tracking-wide text-2xl mb-5 text-gray-800 font-semibold">
                                    {{ $t('cancellationPolicy.title') }}
                                </p>
                                <p class="mt-2 text-gray-500" v-for="term in space.terms" :key="term.id"
                                    v-html="term.description">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>