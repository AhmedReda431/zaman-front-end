
<script setup>
const offers = [
  {
    title: 'استراحه الوسام',
    location: 'الرياض',
    imageUrl:
      'https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=1024x1024&w=is&k=20&c=4TmxYMrPLVb8u09dT5amw1vBsAVbHCxMWZIXqoy-I34=',
    capacity: 35,
    old_price: 1000,
    price: 100000,
  },
  {
    title: 'استراحه الوسام',
    location: 'الرياض',
    imageUrl:
      'https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=1024x1024&w=is&k=20&c=4TmxYMrPLVb8u09dT5amw1vBsAVbHCxMWZIXqoy-I34=',
    capacity: 35,
    old_price: 1000,
    price: 100000,
  },
  {
    title: 'استراحه الوسام',
    location: 'الرياض',
    imageUrl:
      'https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=1024x1024&w=is&k=20&c=4TmxYMrPLVb8u09dT5amw1vBsAVbHCxMWZIXqoy-I34=',
    capacity: 35,
    old_price: 1000,
    price: 100000,
  },
  {
    title: 'استراحه الوسام',
    location: 'الرياض',
    imageUrl:
      'https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=1024x1024&w=is&k=20&c=4TmxYMrPLVb8u09dT5amw1vBsAVbHCxMWZIXqoy-I34=',
    capacity: 35,
    old_price: 1000,
    price: 100000,
  },  
  // More offers...
];
</script>
<template>
  <div class=" pt-20 mb-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-2xl font-semibold w-fit leading-7  mb-6  pb-4 border-b-2">{{ $t('latestOffers') }}</h2>
        </div>
        <ul role="list"
          class="mx-auto mt-6 grid max-w-7xl grid-cols-4 gap-x-8 gap-y-16  lg:mx-0 lg:max-w-none">
          <li class="rounded-lg overflow-hidden border relative" v-for="offer in offers" :key="offer.title">
            <img class="aspect-[3/2] w-full object-cover" :src="offer.imageUrl" alt="" />
            <span>
              <span class="absolute top-5 right-5 bg-secondary rounded text-sm text-white font-semibold px-4 py-1">
                البيع
              </span>
              <span class="absolute top-5 left-5   w-8 h-8 text-sm text-white font-semibold px-4 py-1">
                <Icon size="20" name="ph:heart-bold" />
              </span>
            </span>
            <div class="p-3">
              <div class="flex justify-between items-center">
                <h3 class="mt-3 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  شقه للبيع
                </h3>
                <div class="flex gap-2 items-center">
                  <Icon size="24" name="logos:whatsapp-icon" />
                  <Icon size="24" name="f7:phone-circle" />
                </div>
              </div>
              <p class="w-1/2 text-base leading-7 text-gray-500 flex gap-2 items-center">
                <svg  style="width: 20px" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                  viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762q-.838-1.338-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575Q17.45 16.475 16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10q0 .825.588 1.413T12 12" />
                </svg>
                {{ offer.location }}
              </p>
              <div class="flex gap-x-4">
                <p class=" text-gray-500">
                  <Icon size="20"  name="material-symbols:bed-outline" />
                  <span class="text-secondary">
                    5
                  </span>
                  غرف
                </p>
                <p class=" text-gray-500">
                  <Icon size="20"  name="iconoir:bathroom" />
                  <span class="text-secondary">
                    2
                  </span>
                  دورات مياه
                </p>
              </div>
              <div class="mt-6 font-bold text-md text-secondary">
                <p>
                  {{ offer.price }}
                  {{ $t('common.SAR') }}
                </p>
              </div>
              <!-- <button type="button"
                class="w-full mt-5 rounded-md mx-auto bg-zaman px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                {{ $t('common.bookNow') }}
              </button> -->

            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
