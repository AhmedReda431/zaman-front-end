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

            
            <div class="flex flex-col">
                  <label for="event" class="text-sm font-medium text-stone-600">
                    {{ $t('selectCity') }}
                  </label>
                  <Listbox v-model="city_id">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span class="block truncate">{{ cityName }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2">
                          <ChevronDownIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </span>
                      </ListboxButton>

                      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <ListboxOptions
                          class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          <ListboxOption v-slot="{ active, selected }" v-for="city in cities" :key="city.name"
                            :value="city.id" as="template">
                            <li :class="[
                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                              <span :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]">{{ locale == 'ar' ? city.name_ar : city.name
                                }}</span>
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
                </div>
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

        <!-- Desctiption Type Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">صفة العقار</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>اختر صفة العقار</option>
              <option v-for="desctiption in propertyDesctiptions" :key="desctiption" :value="type">{{ desctiption }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <!-- category Type Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">فئة العقار</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>اختر فئة العقار</option>
              <option v-for="category in propertyCategories" :key="category" :value="category">{{ category }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <!-- Property Type Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">نوع العقار</label>
          <div class="relative">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>اختر نوع العقار</option>
              <option v-for="type in propertyTypes" :key="type" :value="type">{{ type }}</option>
            </select>
            <ChevronDown class="absolute right-2 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <!-- Price Range -->
        <div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">السعر</label>
  <input
    type="range"
    min="0"
    max="1000000"
    step="10000"
    v-model="price"
    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
  />
  <div class="text-center">{{ price }} ريال</div>
</div>

      </div>


      <div class="flex items-center space-x-2 my-4">
  <h2 class="text-sm font-semibold leading-6 text-secondary ml-2">بحث متقدم</h2>
  <div class="flex-grow border-t border-gray-300"></div>
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
          class="px-4 py-2 mx-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" style="background-color: #264642; color: white;"
        >
          بحث
        </button>
        <button class="px-4 py-2 mx-4 bg-gold-500 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
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
    const propertyDesctiptions = ref(['نوع 1', 'نوع 2', 'نوع 3']);
    const propertyCategories = ref(['نوع 1', 'نوع 2', 'نوع 3']);
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
      propertyDesctiptions,
      propertyCategories,
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



input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(255, 136, 0);
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(255, 136, 0);
  cursor: pointer;
}

input[type="range"]::-ms-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(255, 136, 0);
  cursor: pointer;
}

</style>
