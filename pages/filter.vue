<template>
  <div>
    <!-- Top Bar -->
    <div class="bg-white p-2 shadow-sm flex items-center justify-between space-x-2 rtl:space-x-reverse">
      <!-- Filter Button -->
      <button @click="toggleFilter" class="bg-gold-500 text-white px-3 py-1 rounded-md flex items-center">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><!-- Filter Icon SVG --></svg>
        <span class="text-sm">فلتر</span>
      </button>

      <!-- Search Bar -->
      <div class="flex-grow relative">
        <input
          type="text"
          placeholder="البحث عن..."
          class="w-full border border-gray-300 rounded-md py-1 pl-8 pr-4 focus:outline-none focus:border-blue-500 text-sm"
        />
        <svg class="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"><!-- Search Icon SVG --></svg>
      </div>

      <!-- Display Options -->
      <!-- <div class="flex items-center space-x-2 rtl:space-x-reverse"> -->
        <!-- <button @click="toggleView('list')" class="text-gray-500 hover:text-gray-800 p-2"> -->
          <!-- <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">List Icon SVG</svg> -->
        <!-- </button> -->
        <!-- <button @click="toggleView('grid')" class="text-gray-500 hover:text-gray-800 p-2"> -->
          <!-- <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">Grid Icon SVG</svg> -->
        <!-- </button> -->
      <!-- </div> -->

      <!-- Results Counter -->
      <div class="bg-gold-500 text-white px-3 py-1 rounded-md flex items-center space-x-2 rtl:space-x-reverse">
        <span class="font-semibold text-sm">{{ resultsCount }}</span>
        <span class="text-sm">عدد النتائج</span>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><!-- Icon SVG --></svg>
      </div>
    </div>

    <!-- Filter Section -->
    <div v-if="isFilterVisible" class="bg-gray-100 p-6 rounded-lg shadow-md">
      <!-- Grid Container -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <!-- City Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">المدينة</label>
          <div class="relative">
            <select
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              @change="onCityChange($event.target.value)"
            >
              <option>اختر المدينة</option>
              <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <!-- Neighborhood Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">الحي</label>
          <div class="relative">
            <select
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>اختر الحي</option>
              <option v-for="neighborhood in neighborhoods" :key="neighborhood" :value="neighborhood">{{ neighborhood }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <!-- Area Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">المساحة</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>حدد المساحة</option>
              <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <!-- Property Type Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">صفة العقار</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>اختر صفة العقار</option>
              <option v-for="type in propertyTypes" :key="type" :value="type">{{ type }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <!-- Price Range -->
        <div class="space-y-2 col-span-full">
          <label class="block text-sm font-medium text-gray-700">السعر</label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            v-model="price"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div class="text-center">{{ price }} ريال</div>
        </div>
      </div>

      <!-- Additional Filter Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        <!-- Room Count -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">عدد الغرف</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>حدد عدد الغرف</option>
              <option v-for="room in rooms" :key="room" :value="room">{{ room }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <!-- Bathroom Count -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">عدد دورات المياه</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>حدد عدد دورات المياه</option>
              <option v-for="bathroom in bathrooms" :key="bathroom" :value="bathroom">{{ bathroom }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <!-- Furnishing Option -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">مؤثث</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>اختر</option>
              <option v-for="furnishing in furnishings" :key="furnishing" :value="furnishing">{{ furnishing }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <!-- Street Count -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">عدد الشوارع</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>حدد عدد الشوارع</option>
              <option v-for="street in streets" :key="street" :value="street">{{ street }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-6 flex justify-center space-x-4">
        <button
          @click="scrollToResults"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          بحث
        </button>
        <button class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
          بحث متقدم
        </button>
      </div>
    </div>


        <LandingOffers class=""/>
  </div>
</template>

<script>
import { ref } from 'vue';
// import { ChevronDown } from 'lucide-react';

export default {
  name: 'SearchFilterComponent',
  setup() {
    const price = ref(0);
    const isFilterVisible = ref(false);
    const resultsCount = ref(2198);
    const viewMode = ref('list'); // 'list' or 'grid'

    // Filter options
    const cities = ref(['المدينة الأولى', 'المدينة الثانية', 'مكة', 'المدينة الرابعة']);
    const neighborhoods = ref([]);
    const areas = ref(['50 متر مربع', '100 متر مربع', '150 متر مربع', '200 متر مربع']);
    const propertyTypes = ref(['نوع 1', 'نوع 2', 'نوع 3']);
    const rooms = ref([1, 2, 3, 4, 5]);
    const bathrooms = ref([1, 2, 3, 4]);
    const furnishings = ref(['مؤثث', 'غير مؤثث']);
    const streets = ref([1, 2, 3]);

    const toggleFilter = () => {
      isFilterVisible.value = !isFilterVisible.value;
    };

    const toggleView = (mode) => {
      viewMode.value = mode;
    };

    const scrollToResults = () => {
      console.log('Scrolling to results');
      // Implement scrolling logic here
    };

    const onCityChange = (selectedCity) => {
      // Update neighborhoods based on selected city
      if (selectedCity === 'المدينة الأولى') {
        neighborhoods.value = ['الحي الأول', 'الحي الثاني'];
      } else if (selectedCity === 'المدينة الثانية') {
        neighborhoods.value = ['الحي الثالث', 'الحي الرابع'];
      } else if (selectedCity === 'مكة') {
        neighborhoods.value = ['الحي الخامس', 'الحي السادس'];
      } else {
        neighborhoods.value = [];
      }
    };

    return {
      price,
      isFilterVisible,
      resultsCount,
      viewMode,
      cities,
      neighborhoods,
      areas,
      propertyTypes,
      rooms,
      bathrooms,
      furnishings,
      streets,
      toggleFilter,
      toggleView,
      scrollToResults,
      onCityChange,
    };
  }
};
</script>

<style scoped>
.bg-gold-500 {
  background-color: #b58e55;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.p-6 {
  padding: 1.5rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
