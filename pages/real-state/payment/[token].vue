<script setup>
import cash from '@/assets/img/cash.png';
import stc from '@/assets/img/stc.jpg';
import creditcards from '@/assets/img/creditcards.png';
import { ref, onMounted } from 'vue';
definePageMeta({
    title: "payment",
    description: "the payment page",
})
const { t, locale } = useI18n();
const { setRedirectRoute } = useAuthStore();
const router = useRouter();
const route = useRoute();
const { hmTime, hmDate, hmDuration } = useDate();
const { fetchBookingByToken, doCoupon, payCach, booking, loading, loading_coupon, error, errors, errors_coupon } = useBookings();
const paymentMethods = [
  { value: 'cash', name: 'Cach', name_er: 'كاش', icon: cash },
  { value: 'mada', name: 'Credit Card', name_er: 'Credit Card', icon: creditcards },
];

const coupon = ref('');

const sendCoupon = async () => {
  await doCoupon({ coupon: coupon.value });
  if (error.value == "Unauthenticated.") {
    setRedirectRoute(route.path);
    router.push({ path: '/login' });
    return;
  } else if (errors_coupon.value) {
    return;
  } else {
    coupon.value = '';
    await fetchBookingByToken(route.params.token);
  }
};

const payment_method = ref('');

const pay = async () => {
  await payCach({ payment_method: payment_method.value });
  if (error.value == "Unauthenticated.") {
    setRedirectRoute(route.path);
    router.push({ path: '/login' });
    return;
  } else if (errors.value) {
    return;
  }
  if (payment_method.value == 'cash') {
    router.replace('/state/done');
    return;
  }
};

onMounted(async () => {
  await fetchBookingByToken(route.params.token);
});
</script>

<template>
  <div class="flex flex-col items-center ">
    <div
      class="flex flex-wrap justify-center gap-4 w-full  bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl  max-w-sm m-10 p-10">
      <div>

        <div class="mx-auto w-full max-w-[550px] border rounded-xl dark:border-gray-700 p-5">
          <div class="container mx-auto lg:h-auto flex items-center justify-center">
            <div class="w-full max-w-xl mx-auto relative  rounded-lg overflow-hidden cursor-pointer"
              style="height: 300px;">
              <img :src="booking ? booking.main_image : ''" class="w-full h-full object-cover rounded-lg">
              <div class="absolute bottom-0 left-0 right-0 h-20 bg-black bg-opacity-30 text-white p-4 rounded-b-lg">
                <h1 class="text-2xl font-semibold">
                  {{ booking ? booking.space_data.title : '' }}
                </h1>
              </div>
            </div>
          </div>

          <div class="flex items-center my-3 justify-between gap-3">
            <p class="uppercase tracking-wide text-xl text-zaman-400 font-semibold">
              {{ booking ? booking.space_data.address : '' }}
            </p>
            <div class="flex items-center justify-between gap-3">
              <Icon name="material-symbols:home-pin-outline" size="25" color="#10069F" />
              <p class="tracking-wide text-lg text-gray-400 font-semibold">
                {{ booking?.space_data.city }}
              </p>
            </div>
          </div>
          <div class="mt-5">

            <div class="grid grid-cols-2">
              <p class="text-gray-700"> {{ $t('date') }} </p>
              <p class="text-gray-700 justify-self-end">
                {{ hmDate(booking ? booking.booking_date : '') }}
              </p>
            </div>
            <div class="grid grid-cols-2">
              <p class="text-gray-700"> {{ $t('startTime') }} </p>
              <p class="text-gray-700 justify-self-end">
                {{ hmTime(booking ? booking.start_time : '') }}
              </p>
            </div>
            <div class="grid grid-cols-2">
              <p class="text-gray-700"> {{ $t('endTime') }} </p>
              <p class="text-gray-700 justify-self-end">
                {{ hmTime(booking ? booking.end_time : '') }}
              </p>
            </div>
            <hr class="my-2" />
            <div>
              <p class="text-lg font-bold">
                {{ $t('spaceAdditionalServices') }}
              </p>
              <div v-if="booking" class="mt-4">
                <div v-for="service in booking.additional_services" :key="service.id"
                  class=" flex justify-between gap-3">
                  <p class="text-gray-700">{{ service.title }} <span class="text-xs text-gray-500">({{
                      service.description }})</span></p>
                  <p class="text-gray-700"> {{ service.price }} {{ $t('common.SAR') }} </p>
                </div>
              </div>
            </div>
            <hr class="my-2" />
            <div class="flex justify-between gap-5">
              <p class="text-lg font-bold"> {{ $t('common.attends') }} </p>
              <p class="text-lg font-bold">{{ booking ? booking.attend_count : '' }}</p>
            </div>
          </div>
          <div>
            <p class="tracking-wide text-xl text-zaman-400 font-semibold">{{ $t('totalHours') }}: {{ booking
              ? hmDuration(booking.duration) : '' }}
            </p>
            <div class="mt-4 flex justify-between gap-3">
              <p class="text-gray-700">{{ $t('price') }}</p>
              <p class="text-gray-700">{{ booking ? booking.subtotal_amount : '' }} {{ $t('common.SAR') }} </p>
            </div>
            <div class="flex justify-between gap-3">
              <p class="text-gray-700"> {{ $t('cleaningFee') }} </p>
              <p class="text-gray-700">{{ booking ? booking.space_data.extra_charge : '' }}
                {{ $t('common.SAR') }} </p>
            </div>
            <div class="flex justify-between gap-5">
              <p class="text-gray-700">
                {{ $t('taxes') }}
                <span class="text-xs text-gray-500">({{ booking ? booking.tax_percentage : '' }} %)</span>
              </p>
              <p class="text-gray-700">{{ booking ? booking.tax_amount : '' }} {{ $t('common.SAR') }} </p>
            </div>
            <div class="flex justify-between gap-5">
              <p class="text-gray-700">
                {{ $t('discount') }}
              </p>
              <p class="text-gray-700"> {{ booking ? booking.discount_amount : '' }} % </p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between gap-5">
              <p class="text-lg font-bold">{{ $t('total') }}
              </p>
              <p class="mb-1 text-lg font-bold">{{ booking ? booking.total_amount : '' }} {{ $t('common.SAR')
                }}
              </p>
            </div>
          </div>
          <div class="mb-6 pb-6 mt-6 border-b border-gray-200">
            <div class="-mx-2 grid grid-cols-6 items-end gap-2">
              <div class="col-span-4">
                <label class="text-zaman-400 font-semibold text-lg mb-2 m-1">
                  {{ $t('theCoupon') }}
                </label>
                <input v-model="coupon" class="w-full px-3 py-1.5
                                    border border-gray-200 
                                    rounded-md focus:outline-none 
                                    focus:border-indigo-500 
                                    transition-colors" :placeholder="$t('couponCode')" type="text" />
              </div>
              <div class="col-span-2">
                <button @click="sendCoupon"
                  :class="{ 'cursor-not-allowed': loading_coupon, 'opacity-50': loading_coupon }"
                  :disabled="loading_coupon"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

                  <span v-if="!loading_coupon">
                    {{ $t('apply') }}
                  </span>
                  <span v-if="loading_coupon">
                    {{ $t('loading') }}
                    <IconsLoadingWhite />
                  </span>
                </button>
              </div>
            </div>
            <span class="text-red-500" v-if="errors_coupon && errors_coupon['coupon']">{{
              errors_coupon['coupon'][0] }}</span>
          </div>

        </div>


      </div>



      <div class="mx-auto w-full max-w-[550px] border rounded-xl dark:border-gray-700 p-5">
        <div class="w-full mx-auto p-5 rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
          <h1 class="mb-10   text-2xl font-bold"> {{ $t('common.paymentsWay') }} </h1>
          <div class="w-full p-3 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <fieldset class="mt-4">
                <div class="space-y-4 gap-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div v-for="paymentMethod in paymentMethods" :key="paymentMethod.value"
                    class="flex items-center justify-between">
                    <input v-model="payment_method" :value="paymentMethod.value" :id="paymentMethod.value" type="radio"
                      :checked="paymentMethod.value === 'email'"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label :for="paymentMethod.value"
                      class="ml-3 text-sm font-medium leading-6 text-gray-900 flex gap-2 items-center p-2">
                      {{ locale == 'ar' ? paymentMethod.name_er : paymentMethod.name }}
                      <img class="h-8 w-8" :src="paymentMethod.icon" alt="">
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <span class="text-red-500" v-if="errors && errors['payment_method']">{{
            errors['payment_method'][0] }}</span>
        </div>
        <div class="justify-between items-center">
          <button @click="pay" :class="{ 'cursor-not-allowed': loading, 'opacity-50': loading }" :disabled="loading"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span v-if="!loading">
              {{ $t('common.pay') }}
            </span>
            <span v-if="loading">
              {{ $t('loading') }}
              <IconsLoadingWhite />
            </span>
          </button>
          <p class="block mt-4 text-center text-sm leading-tight text-black">
            {{ $t('common.refundDetails') }}
          </p>
        </div>

      </div>

    </div>

  </div>
</template>
