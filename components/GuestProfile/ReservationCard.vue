<script setup>
const { hmDate, hmTime } = useDate()
const { locale } = useI18n()
const router = useRouter()
const props = defineProps({
    reservation: {
        type: Object,
        required: true
    }
})

const complete = () => {
    router.push(`/state/payment/${props.reservation.token}`)
}

</script>

<template>
    <div
        class="relative p-5 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-2xl mx-auto my-10">
        <div class="flex flex-col sm:flex-row">
            <div class="h-auto overflow-hidden w-full sm:w-1/2">
                <NuxtLink :to="`/state/${reservation.space_data.id}`">
                    <div class="h-48 sm:h-auto overflow-hidden relative">
                        <img :src="reservation.main_image" alt="">
                    </div>
                </NuxtLink>
            </div>
            <div class="bg-white py-2 px-3 mr-2 flex-grow">
                <h3 class="block mt-1 text-xl leading-tight font-medium text-black">
                    {{ reservation.space_data.title }}
                </h3>
                <div class="flex items-center gap-2 pt-2">
                    <Icon name="material-symbols:home-pin-outline" size="25" color="#86B6F6" />
                    <p class="block mt-1 text-lg leading-tight font-medium text-gray-400">
                        {{ reservation.space_data.city }}
                    </p>
                </div>
                <div class="flex items-center gap-2 pt-2">
                    <Icon name="ph:clock-clockwise-fill" size="25" color="#86B6F6" />
                    <p class="block mt-1 text-lg leading-tight font-medium text-gray-600">
                        {{ hmTime(reservation.start_time) }} - {{ hmTime(reservation.end_time) }}
                    </p>
                </div>
                <div class="flex items-center gap-2 pt-2">
                    <Icon name="material-symbols-light:calendar-month-outline-sharp" size="25" color="#86B6F6" />
                    <p class="block mt-1 text-lg leading-tight font-medium text-gray-600">
                        {{ hmDate(reservation.booking_date) }}</p>
                </div>
                <div class="flex items-center gap-2 pt-2">
                    <Icon v-if="reservation.status.value == 'open'" name="carbon:status-partial-fail" size="25" color="#ffed4a" />
                    <Icon v-if="reservation.status.value == 'completed'" name="carbon:status-resolved" size="25" color="#84cc16" />
                    <p class="block mt-1 text-lg leading-tight font-medium text-gray-600">
                        {{ locale == 'ar' ? reservation.status.label : reservation.status.value }}
                    </p>
                    <button @click="complete" v-if="reservation.status.value == 'open'"  class="text-white px-1 rounded bg-zaman hover:bg-zaman-500">{{$t('continue')}}</button>
                </div>
            </div>
        </div>
        <hr class="my-3" />
        <div class="max-w-2xl px-8 mx-auto">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">{{ $t('price')}}</h2>
                <h2 class="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">
                    {{ reservation.total_amount }}
                    <span class="mx-3">
                        {{ $t('common.SAR') }}
                    </span>
                </h2>
            </div>
        </div>
    </div>
</template>