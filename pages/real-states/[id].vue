<script setup>

import { ClockIcon, Share2Icon, HeartIcon, MailIcon, PhoneIcon } from 'lucide-vue-next'
const { fetchRealState, realState, loading, success, error } = useRealStates();
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

let propertyInfo = ref([])
let streetInfo = ref([])
let info = ref([])

onMounted(async () => {
  let id = useRoute().params.id
  await fetchRealState(id)
  console.log(id, realState.value)
  // property info
  if (realState.value.land_area)
    propertyInfo.value.push({ label: 'مساحة الأرض', value: `${realState.value.land_area} م`, icon: 'mdi mdi-vector-square' })
  if (realState.value.number_of_rooms)
    propertyInfo.value.push({ label: 'عدد الغرف', value: `${realState.value.number_of_rooms} `, icon: 'mdi mdi-vector-square' })

  if (realState.value.number_of_council_rooms)
    propertyInfo.value.push({ label: 'غرفة مجلس', value: `${realState.value.number_of_council_rooms} `, icon: 'mdi mdi-vector-square' })

  if (realState.value.bathrooms_of_rooms)
    propertyInfo.value.push({ label: 'دورات المياه', value: `${realState.value.bathrooms_of_rooms} `, icon: 'mdi mdi-vector-square' })
  if (realState.value.hall_number)
    propertyInfo.value.push({ label: 'صالة', value: `${realState.value.hall_number} `, icon: 'mdi mdi-vector-square' })
  // street info
  if (realState.value.street)
    streetInfo.value.push({ label: 'اسم الشارع', value: `${realState.value.street} `, icon: 'mdi mdi-vector-square' })
  if (realState.value.number_of_streets)
    streetInfo.value.push({ label: 'عدد الشوارع', value: `${realState.value.number_of_streets} `, icon: 'mdi mdi-vector-square' })

  if (realState.value.street_area)
    streetInfo.value.push({ label: 'عرض الشارع', value: `${realState.value.street_area} `, icon: 'mdi mdi-vector-square' })

  if (realState.value.street_facing)
    streetInfo.value.push({ label: 'واجهة الشارع', value: `${realState.value.street_facing} `, icon: 'mdi mdi-vector-square' })

  // additional info
  //   let info = [
  //   { label: 'فئة العقار', value: 'سكني' },
  //   { label: 'كهرباء', value: 'نعم' },
  //   { label: 'مياه', value: 'نعم' },
  //   { label: 'الطول', value: '12 م' },
  //   { label: 'العمق', value: '27 م' },
  // ]
  if (realState.value.category.name)
    info.value.push({ label: 'نوع العقار', value: `${realState.value.category.name} `, icon: 'mdi mdi-vector-square' })
  if (realState.value.depth)
    info.value.push({ label: 'العمق', value: `${realState.value.depth} `, icon: 'mdi mdi-vector-square' })

  info.value.push({ label: 'الكهرباء', value: realState.value.electricity ? 'نعم' : 'لا', icon: 'mdi mdi-vector-square' })
  info.value.push({ label: 'المياه', value: realState.value.water ? 'نعم' : 'لا', icon: 'mdi mdi-vector-square' })

})
let currentImageIndex = ref(0)
let date = '23-8-2024'
let time = '7:00'
let propertyCode = 'C10304'
let propertyType = 'فيلا للبيع في جدة'
let neighborhood = 'حي النزهة'
let currentIndex = ref(0)
let images = [
  '/api/placeholder/800/600',
  '/api/placeholder/800/600',
  '/api/placeholder/800/600'
]
let currentTab = ref('images')
let tabs = ref([{ label: 'تفاصيل', value: 'details' }, { label: 'صور', value: 'images' }])
let price = '1000000'
let agentName = 'احمد حسن'
let licenseNumber = '7100017784'
let contactIcons = [Share2Icon, HeartIcon, MailIcon]
let actions = [
  'طلب تمويل عقاري',
  'حجز معاينة العقار',
  'الابلاغ عن هذا العقار'
]


</script>

<template>
  <div>

    <header class="bg-white p-4 shadow-sm">
      <div class="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
        <!-- Right side -->
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold">{{ realState?.category?.name }}</span>
          <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {{ realState?.city?.name }}
          </span>
        </div>

        <!-- Left side
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <ClockIcon class="text-gray-500" :size="18" />
          <span class="text-sm text-gray-500 ml-2">كود العقار {{ propertyCode }}</span>
          <span class="text-sm text-gray-500">{{ formattedDate }}</span>
        </div> -->
      </div>
    </header>


    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">

      <div class=" md:col-span-2">
        <!-- Main image -->
        <div class="relative overflow-hidden rounded-lg mb-2 h-96">
          <div class="absolute top-0 right-0 p-2 flex space-x-2 rtl:space-x-reverse">
            <RadioGroup v-model="currentTab">
              <div class="mt-4 grid grid-cols-4 gap-y-6  sm:gap-x-4">
                <RadioGroupOption as="template" v-for="tab in tabs" :key="tab.value" :value="tab.value"
                  v-slot="{ active, checked }">
                  <div
                    :class="[active ? 'border-zaman text-white' : 'border-gray-300', 'w-full relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                    <span class="flex flex-1 justify-center">
                      <span class="flex flex-col">
                        <RadioGroupLabel as="span" :class="[checked ? 'text-white' : 'text-gray-900']"
                          class="block text-sm font-medium text-center z-40  capitalize">{{ tab.label }}
                        </RadioGroupLabel>
                      </span>
                    </span>
                    <!-- <CheckCircleIcon :class="[!checked ? 'invisible' : '', 'h-5 w-5 text-zaman']" aria-hidden="true" /> -->
                    <span
                      :class="[checked ? 'bg-zaman text-white' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                      aria-hidden="true" />
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
          <img
            v-if="currentTab == 'images' && realState.images && realState.images.length > 0 && realState.images[currentImageIndex]"
            :src="realState?.images[currentImageIndex]" alt="Property main view" class="w-full h-full object-cover">
          <div v-if="currentTab == 'details'" class="mt-28 mx-5">
            {{ realState.description }}
          </div>
        </div>

        <!-- Thumbnail gallery -->
        <div v-if="currentTab == 'images'" class="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-2">
          <div v-for="(image, index) in realState.images" :key="index" class="flex-shrink-0 cursor-pointer relative"
            @click="currentImageIndex = index">
            <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-20 h-20 object-cover rounded">
          </div>
        </div>
      </div>

      <div class="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:col-span-1">
        <!-- Price -->
        <div class="bg-teal-800 text-white text-center py-3 text-xl font-bold">
          {{ realState?.price }} ريال سعودي
        </div>

        <!-- Logo -->
        <div class="p-4 flex justify-center">
          <IconsLogo class="h-14 w-auto " alt="zaman" />
        </div>

        <!-- Contact buttons -->
        <div class="grid grid-cols-1 p-4 gap-2 border-t border-b border-gray-200">
          <button v-if="realState.phone" class="text-gray-600 hover:text-green-600 flex items-center">
            <PhoneIcon size="24" />
            <span class=" mx-2 text-sm">رقم الهاتف</span>
            {{ realState.phone }}
          </button>

          <button v-if="realState.whatsup" class="text-gray-600 hover:text-green-600 flex items-center">
            <PhoneIcon size="24" />
            <span class=" mx-2 text-sm">رقم الواتساب</span>
            {{ realState.whatsup }}

          </button>
          <button v-if="realState.email" class="text-gray-600 hover:text-green-600 flex items-center">
            <MailIcon size="24" />
            <span class=" mx-2 text-sm">الايميل</span>
            {{ realState.email }}

          </button>
          <div v-else>
            لا يوجد معلومات للتواصل لهذا العقار
          </div>
          <!-- <button v-for="(icon, index) in contactIcons" :key="index"
            class="text-gray-600 hover:text-gray-800 flex items-center">
            <component :is="icon" size="24" />
          </button> -->
        </div>

        <!-- Agent info -->
        <!-- <div class="flex justify-between px-4 py-2 bg-gray-100">
          <div class="text-right">
            <p class="text-sm text-gray-600">المسوق</p>
            <p class="font-semibold">{{ agentName }}</p>
          </div>
          <div class="text-left">
            <p class="text-sm text-gray-600">رقم ترخيص الهيئة العامة العقار</p>
            <p class="font-semibold">{{ licenseNumber }}</p>
          </div>
        </div> -->

        <!-- Action buttons -->
        <!-- <div class="p-4 space-y-2">
          <button v-for="action in actions" :key="action"
            class="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition duration-300 ease-in-out">
            {{ action }}
          </button>
        </div> -->
      </div>
    </div>


    <div class="p-4 md:p-8 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-right">معلومات العقار</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-gray-200 pt-4 ">
        <div v-for="(item, index) in propertyInfo" :key="index"
          class="flex flex-col items-center border border-gray-300 rounded-lg p-3 w-36 text-center">
          <span class="flex items-center gap-1 text-yellow-700">
            <span v-if="item.icon" :class="item.icon"></span>
            {{ item.value }}
          </span>
          <span class="text-gray-500">{{ item.label }}</span>
        </div>
      </div>
    </div>



    <!-- <div class="p-4 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 class="text-lg font-semibold text-right text-gray-700 mb-4">موقع العقار</h2>
      <div class="overflow-hidden rounded-lg">
        <img src="" alt="Map showing property location" class="w-full h-auto object-cover">
      </div>
    </div> -->


    <div class="p-4 md:p-8 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-right">معلومات الشارع</h2>
      <div class="flex flex-col md:flex-row gap-4 ">
        <div v-for="(item, index) in streetInfo" :key="index"
          class="flex flex-col items-center border border-gray-300 rounded-lg p-2 w-32 text-center">
          <span class="flex items-center gap-1 text-yellow-700">
            <span v-if="item.icon" :class="item.icon"></span>
            {{ item.value }}
          </span>
          <span class="text-gray-500">{{ item.label }}</span>
        </div>
      </div>
    </div>






    <div class="p-4 md:p-8 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-center">معلومات إضافية</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-gray-200 pt-4">
        <div v-for="(item, index) in info" :key="index"
          class="flex flex-col items-center border-l border-gray-200 last:border-none md:last:border-none pr-4">
          <span class="text-gray-500">{{ item.label }}</span>
          <span class="text-yellow-700">{{ item.value }}</span>
        </div>
      </div>
    </div>


    <!-- <div class="p-4 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 class="text-lg font-semibold text-right text-gray-700 mb-4">المميزات والمرافق</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="(amenity, index) in amenities" :key="index"
          class="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg border border-gray-400">
          <i :class="amenity.icon" class="text-2xl mb-2"></i>
          <span class="text-sm text-gray-700">{{ amenity.label }}</span>
        </div>
      </div>
    </div> -->


  </div>


</template>

<style scoped>
/* Add custom styles here if needed */
</style>
