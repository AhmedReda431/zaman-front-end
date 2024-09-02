<script setup>
const { hmDate, hmTime, hmDuration } = useDate()

defineProps({
    order: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="w-full max-w-full px-3 mx-auto">
        <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 my-3">
            <div class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                <!-- card header -->
                <NuxtLink :to="`/state/${order.space_data.id}`" class="text-xl text-gray-600 my-5 p-3 border-b-2 border-sky-500 font-medium">
                    <div class="relative inline-block shrink-0 rounded-2xl me-3">
                        <img :src="order.main_image" class="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="">
                        <span class="mx-3 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{{$t('common.space')}} {{ order.space_data.title }}</span>
                    </div>
                </NuxtLink>
                <!-- end card header -->
                <!-- card body  -->
                <div class="flex-auto block py-8 pt-6 px-9">
                    <div>
                        <table class="w-full my-0 align-middle text-dark border-neutral-200">
                            <thead class="align-bottom">
                                <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                                    <th class="pb-3 text-start min-w-[100px]">{{$t('common.customer')}}</th>
                                    <th class="pb-3 text-start min-w-[100px]">{{$t('common.attends')}}</th>
                                    <th class="pb-3 text-start min-w-[100px]">{{$t('common.paymentAmount')}}</th>
                                    <th class="pb-3 text-start min-w-[100px]">{{$t('common.date')}}</th>
                                    <th class="pb-3 text-start min-w-[100px]">{{$t('common.from')}}</th>
                                    <th class="pb-3 text-start min-w-[100px]">{{$t('common.to')}}</th>
                                    <th class="pb-3 text-start min-w-[100px]">{{$t('common.time')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-dashed last:border-b-0">
                                    <td class=" text-start">
                                        <span class="font-semibold text-light-inverse text-md/normal">{{ order.guest.name }} </span>
                                    </td>
                                    <td class=" text-start">
                                        {{ order.attend_count }}
                                    </td>
                                    <td class=" text-start">
                                        <span class="text-start align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                            {{ order.total_amount }}
                                            <span class="mx-3">
                                                {{ $t('common.SAR') }}
                                            </span>
                                        </span>
                                    </td>
                                    <td class=" text-start">
                                        <span class="font-semibold text-light-inverse text-md/normal">
                                            {{ hmDate(order.booking_date) }}
                                        </span>
                                    </td>
                                    <td class=" text-start">
                                        <span class="text-start align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none  bg-primary-light rounded-lg">
                                            {{ hmTime(order.start_time) }}
                                        </span>
                                    </td>
                                    <td class=" text-start">
                                        <span class="text-start align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none  bg-primary-light rounded-lg">
                                            {{ hmTime(order.end_time) }}
                                        </span>
                                    </td>
                                    <td class=" text-start">
                                        <span class="text-start align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none  bg-primary-light rounded-lg">
                                            {{ hmDuration(order.duration) }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
