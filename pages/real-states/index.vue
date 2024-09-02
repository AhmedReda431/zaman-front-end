<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue';
import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
definePageMeta({
    title: "RealStates",
    description: "the spaces page description",
})
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const { fetchRealStates, spaces, loading, error, total, } = useRealStates();
const { fetchCities, cities } = useCities();
const categories = ref([
  { value: '', label: t('all') },
  { value: 'event_hall', label: t('categories.eventHalls') },
  { value: 'camps', label: t('categories.camps') },
  { value: 'events', label: t('categories.events') },
  { value: 'resting', label: t('categories.lounges') },
]);
const type = ref('');
const city_id = ref('');
const attends = ref('');
const typeLabel = computed(() => {
  if (type.value != '') {
    const obj = categories.value.find(cat => cat.value == type.value);
    return obj.label;
  }
  return t('categories.choose');
});
const cityName = computed(() => {
  if (city_id.value != '') {
    const obj = cities.value.find(cat => cat.id == city_id.value);
    return locale.value == "ar" ? obj.name_ar : obj.name;
  }
  return t('selectCity');
});
const search = async () => {
  let obj = {
    city_id: city_id.value,
    type: type.value,
    attends: attends.value
  };
  obj = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== ''));
  const queryString = new URLSearchParams(obj).toString();

  await fetchRealStates(queryString);
};
onBeforeMount(async () => {
  await fetchCities();
  cities.value.unshift({
    id: '',
    name: 'All',
    name_ar: 'الكل',
  })
  if (Object.keys(route.query).length > 0) {
    Object.keys(route.query).forEach(key => {
      if (key == 'city_id') {
        city_id.value = route.query[key];
      }
      if (key == 'type') {
        type.value = route.query[key];
      }
      if (key == 'attends') {
        attends.value = route.query[key];
      }
    });
    await search();
    return;
  }
  await fetchRealStates();
});
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div>
      <div class="md:m-10">
        <div class="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow">
          <ClientOnly>
            <div>
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div class="flex flex-col">
                  <label for="type" class="text-sm font-medium text-stone-600"> {{ $t('chooseCategory') }} </label>
                  <Listbox v-model="type">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span class="block truncate">{{ typeLabel }}</span>
                        <span class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2">
                          <ChevronDownIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
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
                </div>

                <div class="flex flex-col">
                  <label for="event" class="text-sm font-medium text-stone-600">
                    {{ $t('selectCity') }}
                  </label>
                  <Listbox v-model="city_id">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span class="block truncate">{{ cityName }}</span>
                        <span class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2">
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

                <div class="flex flex-col">
                  <label for="num" class="text-sm font-medium text-stone-600"> {{ $t('common.attends') }} </label>
                  <input type="number" id="num" v-model="attends" :placeholder="$t('enterAttends')"
                    class="mt-1 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zaman-600 sm:text-sm sm:leading-6">
                </div>

                <button @click="search"
                  class="mt-6 rounded-lg  bg-zaman hover:bg-zaman-700 focus:bg-zaman-800 w-full py-3 font-semibold text-white outline-none hover:opacity-80 focus:ring flex items-center justify-center space-x-2">
                  <MagnifyingGlassIcon class="h-4 w-4 text-white rtl:ml-2 mr-2" aria-hidden="true" />
                  <span>{{ $t('common.search') }}</span>
                </button>
              </div>

            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
    <p class="block text-xl leading-tight font-medium text-black my-6">{{ $t('results') }} ( {{ total }})</p>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="grid gap-4  content-evenly md:grid-cols-2 lg:grid-cols-3 mt-4">
        <CardSkeleton :many="6" />
      </div>
    </transition>
    <div v-if="!loading && spaces.length > 0" class="grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="space in spaces" :key="space.id">
        <Card :space="space" />
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="(spaces.length == 0 || !spaces) && !loading" class="my-12">
        <div class="flex flex-col items-center justify-center">
          <p class="text-xl font-medium text-stone-600">
            {{ $t('noRealStates') }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

