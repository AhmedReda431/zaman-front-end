<script setup>
import { ref, computed, onMounted } from 'vue';
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption,RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
const { t, locale } = useI18n();
const { fetchCities, cities } = useCities();
const router = useRouter();
const categories = ref([
  { value: 'sell', label: t('categories.sell') },
  { value: 'rent', label: t('categories.rent') },
  { value: 'requests', label: t('categories.requests') },
]);
const type = ref('');
const city_id = ref('');

const typeLabel = computed(() => {
  if (type.value != '') {
    const obj = categories.value.find(cat => cat.value == type.value);
    return obj.label;
  }
  return t('categories.choose');
});
const cityName = computed(() => {
  if (city_id.value) {
    const obj = cities.value.find(cat => cat.id == city_id.value);
    return unref(obj).name;
  }
  return "اختر المدينه";
});
const searchButton = () => {
  router.push({
    path: '/real-states', query: {
      city_id: city_id.value,
      type: type.value,
    }
  });
};
onMounted(async () => {
  await fetchCities();
});
</script>

<template>
  <div class="relative overflow-hidden hero-section w-full">
    <div class="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">

      <div class="min-h-full grid grid-cols-1 sm:gap-x-4 gap-y-2 items-center justify-center">

        <h1 class="text-white font-semibold text-3xl text-center mt-16">
          {{ $t('heroSectionMain') }}
        </h1>
        <div>
          <div class="px-4 py-5 sm:p-6 col-span-2 ">

            <RadioGroup v-model="type" class="mt-2 w-max ">
              <!-- <RadioGroupLabel class="text-base font-semibold text-gray-900">{{
                $t('categories.choose')
              }}</RadioGroupLabel> -->
              <div class="mt-4 grid grid-cols-4 gap-x-4 gap-y-4 text-center">
                <RadioGroupOption as="template" v-for="category in categories" :key="category.value"
                  :value="category.value" v-slot="{ active, checked }">
                  <div :class="[
                    active ? '' : '',
                    checked ? 'bg-zaman-500 border-2 border-zaman-500 bg-opacity-75 text-white' : 'bg-transparent border-2 border-gray-300 text-gray-300',
                    'relative cursor-pointer rounded-lg px-5 py-2 shadow-md focus:outline-none',
                  ]">
                  {{ category.label }}
                  <span v-if="checked" class="custom-arrow" ></span>
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>

            <ClientOnly>

              <div class="mt-5 grid grid-cols-12 gap-3 bg-white rounded-lg p-3">
                <Listbox v-model="type" class="col-span-5">
                  <div class="relative  w-full">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span class="block truncate">{{ typeLabel }}</span>
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center rtl:pl-2 pr-2">
                        <ChevronDownIcon class="h-7 w-7 text-gray-400" aria-hidden="true" />
                      </span>
                    </ListboxButton>

                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
                      <ListboxOptions
                        class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="cat in categories" :key="cat.label"
                          :value="cat.value" as="template">
                          <li :class="[
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-10 pr-4',
                          ]">
                            <span :class="[
                              selected ? 'font-medium' : 'font-normal',
                              'block truncate',
                            ]">{{ cat.label }}</span>
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
                <Listbox v-model="city_id" class="col-span-5">
                  <div class="relative w-full">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span class="block truncate">{{ cityName }}</span>
                      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center rtl:pl-2 pr-2">
                        <ChevronDownIcon class="h-7 w-7 text-gray-400" aria-hidden="true" />
                      </span>
                    </ListboxButton>

                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
                      <ListboxOptions
                        class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                <!-- <button @click="search"
                  class="mt-4 col-span-2 gap-x-2 flex flex-nowrap border-2 border-secondary items-center justify-center rounded-md bg-secondary px-2 min-w-max  text-sm font-semibold text-white shadow-sm hover:text-secondary hover:bg-white sm:mt-0">
                  <Icon name="tdesign:map-search-1" size="22" />
                  <span>
                    {{ $t('searchByMap') }}
                  </span>
                </button> -->
                <button @click="searchButton"
                  class="mt-4 col-span-2 gap-x-2 flex flex-nowrap border-2 border-zaman items-center justify-center rounded-md bg-zaman px-2 min-w-max  text-sm font-semibold text-white shadow-sm hover:bg-zaman-500 sm:mt-0">
                  <Icon name="iconamoon:search-light" size="22" />
                  <span>
                    {{ $t('common.search') }}
                  </span>
                </button>
              </div>
            </ClientOnly>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hero-section {
  height: 600px;
  background-image: url('~/assets/img/hero-main.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.custom-arrow{
  position: absolute;
  display: block;
  bottom: -20px;
  right: 50%;
  transform: translateX(50%);
  border: 10px solid transparent;
  border-top-color:  theme('colors.zaman.500');  
  transition: all 0.3s ease-in-out;
}
</style>