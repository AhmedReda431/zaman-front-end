<script>
import { ClockIcon, Share2Icon, HeartIcon, MailIcon, PhoneIcon } from 'lucide-vue-next'

export default {
  components: {
    ClockIcon,
    Share2Icon,
    HeartIcon,
    MailIcon,
    PhoneIcon,
  },
  data() {
    return {
      date: '23-8-2024',
      time: '7:00',
      propertyCode: 'C10304',
      propertyType: 'فيلا للبيع في جدة',
      neighborhood: 'حي النزهة',
      currentIndex: 0,
      images: [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600'
      ],
      tabs: ['تفاصيل', 'فيديو', 'صور', 'الموقع', 'مخطط العقار', 'جولة افتراضية'],
      price: '1,000,000',
      agentName: 'احمد حسن',
      licenseNumber: '7100017784',
      contactIcons: [Share2Icon, HeartIcon, MailIcon],
      actions: [
        'طلب تمويل عقاري',
        'حجز معاينة العقار',
        'الابلاغ عن هذا العقار'
      ],
      info: [
        { label: 'فئة العقار', value: 'سكني' },
        { label: 'كهرباء', value: 'نعم' },
        { label: 'مياه', value: 'نعم' },
        { label: 'الطول', value: '12 م' },
        { label: 'العمق', value: '27 م' },
      ],
      streetInfo: [
        { label: 'الشارع', value: '1', icon: '' },
        { label: 'عرض الشارع', value: '15', icon: 'mdi mdi-ruler' },
        { label: 'واجهة الشارع', value: 'الشمالية', icon: 'mdi mdi-compass-outline' },
      ],
      propertyInfo: [
        { label: 'مساحة الأرض', value: '324 م', icon: 'mdi mdi-vector-square' },
        { label: 'غرفة مجلس', value: '2', icon: 'mdi mdi-sofa' },
        { label: 'صالة', value: '1', icon: 'mdi mdi-sofa-outline' },
        { label: 'دورات المياه', value: '2', icon: 'mdi mdi-toilet' },
        { label: 'غرف النوم', value: '3', icon: 'mdi mdi-bed' },
      ],
      amenities: [
        { label: 'حوش', icon: 'mdi mdi-home-group' },
        { label: 'غرفة ملابس', icon: 'mdi mdi-wardrobe' },
        { label: 'غرفة عاملة', icon: 'mdi mdi-human-male-child' },
        { label: 'ملحق', icon: 'mdi mdi-office-building' },
        { label: 'غرفة سائق', icon: 'mdi mdi-car-side' },
        { label: 'سطح', icon: 'mdi mdi-home-roof' }
      ]
    }
  },
  computed: {
    formattedDate() {
      return `${this.time} ${this.date}`
    }
  }
}
</script>

<template>
  <div>

    <header class="bg-white p-4 shadow-sm">
      <div class="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
        <!-- Right side -->
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold">{{ propertyType }}</span>
          <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {{ neighborhood }}
          </span>
        </div>
  
        <!-- Left side -->
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <ClockIcon class="text-gray-500" :size="18" />
          <span class="text-sm text-gray-500 ml-2">كود العقار {{ propertyCode }}</span>
          <span class="text-sm text-gray-500">{{ formattedDate }}</span>
        </div>
      </div>
    </header>
  
  
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
  
      <div class=" md:col-span-2">
        <!-- Main image -->
        <div class="relative overflow-hidden rounded-lg mb-2">
          <div class="absolute top-0 right-0 p-2 flex space-x-2 rtl:space-x-reverse">
            <button v-for="tab in tabs" :key="tab"
              class="bg-white bg-opacity-80 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-opacity-100 transition">
              {{ tab }}
            </button>
          </div>
          <img :src="images[currentIndex]" alt="Property main view" class="w-full h-96 object-cover">
        </div>
  
        <!-- Thumbnail gallery -->
        <div class="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-2">
          <div v-for="(image, index) in images" :key="index" class="flex-shrink-0 cursor-pointer relative"
            @click="currentIndex = index">
            <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-20 h-20 object-cover rounded">
            <div v-if="index === 0"
              class="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-1 rounded-tl text-xs">
              +{{ images.length }}
            </div>
          </div>
        </div>
      </div>
  
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:col-span-1">
        <!-- Price -->
        <div class="bg-teal-800 text-white text-center py-3 text-xl font-bold">
          {{ price }} ريال سعودي
        </div>
  
        <!-- Logo -->
        <div class="p-4 flex justify-center">
          <img src="" alt="Zman Real Estate Logo" class="h-16">
        </div>
  
        <!-- Contact buttons -->
        <div class="flex justify-around space-x-4 rtl:space-x-reverse p-4 border-t border-b border-gray-200">
          <button class="text-gray-600 hover:text-green-600 flex items-center">
            <PhoneIcon size="24" />
            <span class="ml-1 text-sm">رقم التواصل</span>
          </button>
  
          <button v-for="(icon, index) in contactIcons" :key="index"
            class="text-gray-600 hover:text-gray-800 flex items-center">
            <component :is="icon" size="24" />
          </button>
        </div>
  
        <!-- Agent info -->
        <div class="flex justify-between px-4 py-2 bg-gray-100">
          <div class="text-right">
            <p class="text-sm text-gray-600">المسوق</p>
            <p class="font-semibold">{{ agentName }}</p>
          </div>
          <div class="text-left">
            <p class="text-sm text-gray-600">رقم ترخيص الهيئة العامة العقار</p>
            <p class="font-semibold">{{ licenseNumber }}</p>
          </div>
        </div>
  
        <!-- Action buttons -->
        <div class="p-4 space-y-2">
          <button v-for="action in actions" :key="action"
            class="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition duration-300 ease-in-out">
            {{ action }}
          </button>
        </div>
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
  
  
  
    <div class="p-4 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 class="text-lg font-semibold text-right text-gray-700 mb-4">موقع العقار</h2>
      <div class="overflow-hidden rounded-lg">
        <!-- Replace 'path-to-map-image' with the actual path to your map image -->
        <img src="" alt="Map showing property location" class="w-full h-auto object-cover">
      </div>
    </div>
  
  
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
  
  
    <div class="p-4 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 class="text-lg font-semibold text-right text-gray-700 mb-4">المميزات والمرافق</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="(amenity, index) in amenities" :key="index"
          class="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg border border-gray-400">
          <i :class="amenity.icon" class="text-2xl mb-2"></i>
          <span class="text-sm text-gray-700">{{ amenity.label }}</span>
        </div>
      </div>
    </div>
  

  </div>  


</template>

<style scoped>
/* Add custom styles here if needed */
</style>
