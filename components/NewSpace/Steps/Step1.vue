<script setup>
import { useForm, useIsFormValid, useValidateForm } from 'vee-validate';
import { ref, computed, onMounted, watch } from 'vue';
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
const { t, locale } = useI18n();
const { values } = useForm();
const validateForm = useValidateForm();
const isValid = useIsFormValid();
const emit = defineEmits(['valid', 'notValid']);
const { fetchRegions, regions } = useRegions();
const { space } = useSpaceStore();
defineProps({
  serverErrors: {
    required: false
  }
})
const region_id = ref('');
const city = ref(space?.city || null);
const address = ref(space?.address || null);
const selectedLocation = ref(space ? { lat: parseFloat(space.lat), lng: parseFloat(space.lng) } : null);
const location = (data) => {
  selectedLocation.value = data;
};

const validate = async () => {
  await validateForm();
  if (isValid.value) {
    let formData = {
      step: 1,
      region_id: region_id.value,
      city: city.value,
      address: address.value,
      map: selectedLocation.value
    };
    emit('valid', formData);
  } else {
    emit('notValid', 1)
  }
};

defineExpose({
  validate
});

watch(isValid, (value) => {
  if (value) {
    let formData = {
      step: 1,
      region_id: region_id.value,
      city: city.value,
      address: address.value,
      map: selectedLocation.value
    }
    emit('valid', formData)
  }
})

const validateAddress = (value) => {
  if (!value) {
    return t('validation.address.required');
  }
  return true;
};
const validateCity = (value) => {
  if (!value) {
    return t('validation.city.required');
  }
  return true;
};
const validateRegion = (value) => {
  if (!value) {
    return t('validation.region.required');
  }
  return true;
};
const validateMap = (value) => {
  if (!selectedLocation.value) {
    return t('validation.map.required');
  }
  return true;
};

const regionName = computed(() => {
  if (region_id.value != '') {
    const obj = regions.value.find(cat => cat.id == region_id.value);
    return locale.value == "ar" ? unref(obj).name_ar : unref(obj).name;
  }
  return t('common.selectRegion');
});
onMounted(async () => {
  await fetchRegions();
  if (space?.region_id) {
    region_id.value = space.region_id;
  }
})

</script>
<template>
  <div class="border-b border-gray-900/10 pb-8">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{ $t('common.address') }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ $t('common.addressDescription') }}</p>
    </div>
    <div class="p-4 sm:px-6">
      <div>
        <label for="address" class="text-sm font-semibold leading-6 text-gray-600">
          {{ $t('common.selectLocation') }}
        </label>
        <div class="mt-4 grid gap-4 grid-cols-3">
          <div class="flex flex-col">
            <label class="text-sm font-medium text-stone-600">
              {{ $t('common.selectRegion') }}
            </label>
            <Listbox v-model="region_id">
              <div class="relative mt-1">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span class="block truncate">{{ regionName }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
                  <ListboxOptions
                    class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    <ListboxOption v-slot="{ active, selected }" v-for="region in regions" :key="region.name"
                      :value="region.id" as="template">
                      <li :class="[
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]">
                        <span :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]">{{ locale == 'ar' ? region.name_ar : region.name }}</span>
                        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
            <Field v-model="region_id" class="hidden" name="region_id" :rules="validateRegion" />
            <ErrorMessage class="text-[red] block mt-2" name="region_id" />
            <p class="text-[red] block mt-2" v-if="serverErrors['region_id']" v-text="serverErrors['region_id'][0]">
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-stone-600">
              {{ $t('common.city') }}
            </label>
            <Field v-model="city" type="text" name="city" id="city" :rules="validateCity"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <ErrorMessage class="text-[red] block mt-1" name="city" />
            <p class="text-[red] block mt-2" v-if="serverErrors['city']" v-text="serverErrors['city'][0]">
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-stone-600">
              {{ $t('common.address') }}
            </label>
            <Field v-model="address" type="text" name="address" id="address" :rules="validateAddress"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <ErrorMessage class="text-[red] block mt-1" name="address" />
            <p class="text-[red] block mt-2" v-if="serverErrors['address']" v-text="serverErrors['address'][0]">
            </p>
          </div>
        </div>
      </div>
      <div class="w-full mt-3 rounded overflow-hidden" style="height: 300px">
        <MapSelect :selected="selectedLocation" @location-selected="location" />
      </div>
      <Field v-model="selectedLocation" class="hidden" name="map" id="map" :rules="validateMap" />
      <ErrorMessage class="text-[red] block mt-1" name="map" />
      <p class="text-[red] block mt-2" v-if="serverErrors['lng']" v-text="serverErrors['lng'][0]">
      </p>
      <p class="text-[red] block mt-2" v-if="serverErrors['lat']" v-text="serverErrors['lat'][0]">
      </p>
    </div>
  </div>
</template>
