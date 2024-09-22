<script setup>
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const { fetchCities, cities } = useCities();
const { fetchCategories, categories } = useCategories();
const { fetchRealStates, realStates, loading, success, error } = useRealStates();

const isFilterVisible = ref(false)
const isAdvancedFilterVisible = ref(false)
const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value
}
const toggleAdvancedFilter = () => {
  isAdvancedFilterVisible.value = !isAdvancedFilterVisible.value
}

const route = useRoute()
const router = useRouter()
let query = ''

query = route.query


// filter data
const city_id = ref(query.city_id || '');
const category_id = ref(query.category_id || '');
const search = ref(query.search || '')
const land_area = ref(query.land_area || '')
const price_from = ref(query.price_from || 0)
const number_of_streets = ref(query.number_of_streets || null)

const cityName = computed(() => {
  if (city_id.value) {
    const obj = cities.value.find(cat => cat.id == city_id.value);
    return unref(obj).name;
  }
  return "اختر المدينه";
});
const categoryName = computed(() => {
  if (category_id.value) {
    const obj = categories.value.find(cat => cat.id == category_id.value);
    return unref(obj).name;
  }
  return "اختر نوع العقار";
});

onMounted(async () => {
  await fetchCities();
  await fetchCategories();
  await fetchRealStates(query);
  console.log("realStates", realStates.value)
})
const searchMethod = async () => {
  router.push({
    path: '/real-states',
    query: {
      city_id: city_id.value,
      category_id: category_id.value,
      search: search.value,
      land_area: land_area.value,
      price_from: price_from.value,
      number_of_streets: number_of_streets.value,
    }
  })
  query = route.query
  await fetchRealStates(query)
}
</script>
<template>
  <div class="max-w--7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div>
      <!-- Top Bar -->

      <div class=" mt-5  flex items-center justify-between gap-2">
        <!-- Filter Button -->
        <button @click="toggleFilter" class="bg-zaman text-white px-3 py-2.5 rounded-md flex items-center">
          <Icon name="mdi:filter" class="w-4 h-4" />
          <span class="text-sm">فلتر</span>
        </button>

        <!-- Search Bar -->
        <div class="flex-grow relative">
          <input v-model="search" type="text" name="search" id="search" placeholder="البحث عن .."
            class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-md  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" />
        </div>

        <!-- Results Counter -->
        <div class="bg-secondary text-white px-3 py-2.5 rounded-md flex justify-center items-center gap-x-1">
          <span class="font-semibold text-sm">{{ realStates?.meta?.total || 0 }}</span>
          <span class="text-sm">عدد النتائج</span>
        </div>
      </div>

      <!-- Filter Section -->
      <div v-if="isFilterVisible" class="mt-3 bg-white p-6 rounded-lg shadow-md">
        <!-- Grid Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <!-- City Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">المدينة</label>
            <div class="relative">


              <div class="flex flex-col">
                <Listbox v-model="city_id">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span class="block truncate">{{ cityName }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2">
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
              </div>
            </div>
          </div>

          <!-- land_area Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">المساحه</label>
            <div class="relative">


              <div class="flex flex-col">
                <Field v-model="land_area" type="text" name="land_area" id="land_area"
                  placeholder="ادخل المساحه بالمتر المربع"
                  class="block w-full rounded-lg ring-1 ring-inset ring-gray-300 border-0 mt-1 py-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

              </div>
            </div>
          </div>

          <!-- Property Type Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">نوع العقار</label>
            <div class="relative">


              <div class="flex flex-col">
                <Listbox v-model="category_id">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span class="block truncate">{{ categoryName }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2">
                      </span>
                    </ListboxButton>

                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
                      <ListboxOptions
                        class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="category in categories" :key="category.name"
                          :value="category.id" as="template">
                          <li :class="[
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-10 pr-4',
                          ]">
                            <span :class="[
                              selected ? 'font-medium' : 'font-normal',
                              'block truncate',
                            ]">
                              {{
                                category.name
                              }}
                            </span>
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
            </div>
          </div>

          <!-- price_from Range -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">السعر</label>
            <input type="range" min="0" max="10000000" step="1000" v-model="price_from"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider" />
            <div class="text-center">
              {{ price_from }} ريال
            </div>

          </div>

        </div>




        <!-- Additional Filter Options -->
        <template v-if="isAdvancedFilterVisible">

          <div class="flex items-center space-x-2 my-4">
            <h2 class="text-sm font-semibold leading-6 text-secondary ml-2">بحث متقدم</h2>
            <div class="flex-grow border-t border-gray-300"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            <!-- Room Count -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">عدد الغرف</label>
              <div class="relative">


                <div class="flex flex-col">
                  <Listbox v-model="number_of_rooms">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span class="block truncate">{{ number_of_rooms || "اختر عدد الغرف " }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2">
                        </span>
                      </ListboxButton>

                      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <ListboxOptions
                          class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          <ListboxOption v-slot="{ active, selected }" v-for="i in 20" :key="i + '-number_of_rooms'"
                            :value="i" as="template">
                            <li :class="[
                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                              <span :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]">
                                {{ i }}
                              </span>
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
              </div>
            </div>

            <!-- Bathroom Count -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">عدد الحمامات</label>
              <div class="relative">


                <div class="flex flex-col">
                  <Listbox v-model="bathrooms_of_rooms">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span class="block truncate">{{ bathrooms_of_rooms || "اختر عدد الحمامات " }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2">
                        </span>
                      </ListboxButton>

                      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <ListboxOptions
                          class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          <ListboxOption v-slot="{ active, selected }" v-for="i in 10" :key="i + '-bathrooms_of_rooms'"
                            :value="i" as="template">
                            <li :class="[
                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                              <span :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]">
                                {{ i }}
                              </span>
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
              </div>
            </div>

            <!-- Street Count -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">عدد الشوارع</label>
              <div class="relative">


                <div class="flex flex-col">
                  <Listbox v-model="number_of_streets">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span class="block truncate">{{ number_of_streets || "اختر عدد الشوارع " }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2">
                        </span>
                      </ListboxButton>

                      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <ListboxOptions
                          class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          <ListboxOption v-slot="{ active, selected }" v-for="i in 4" :key="i + '-number_of_streets'"
                            :value="i" as="template">
                            <li :class="[
                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                              <span :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]">
                                {{ i }}
                              </span>
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
              </div>
            </div>
          </div>
        </template>

        <!-- Buttons -->
        <div class="mt-6 flex justify-center space-x-4">
          <button @click="searchMethod"
            class="px-4 py-2 mx-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            style="background-color: #264642; color: white;">
            بحث
          </button>
          <button @click="toggleAdvancedFilter"
            class="px-4 py-2 mx-4 bg-secondary text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
            بحث متقدم
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8 grid grid-cols-4 gap-x-4" v-if="realStates.real_estates && realStates.real_estates.length > 0">
      <NuxtLink v-for="item in realStates.real_estates" :key="item.id" :to="`/real-states/${item.id}`">
        <OfferCard :offer="item" class="my-4" />
      </NuxtLink>
    </div>
    <div v-if="loading" class="mt-8 grid grid-cols-4 gap-4 mb-5">
      <CardSkeleton v-for="i in 8" :key="i" />
    </div>
    
    <div v-if="!loading && ( !realStates.real_estates || realStates.real_estates.length == 0)" class="mt-8 w-full text-center mb-5">
      <h2>
        لا يوجد عناصر 
      </h2>
    </div>
  </div>

</template>



<style scoped>
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
