<script setup>
import { useForm, useIsFormValid, useValidateForm, useFieldValue, Form, Field } from 'vee-validate';
import { ref, computed, onMounted } from 'vue';
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import * as yup from 'yup';
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/20/solid';
const emit = defineEmits(['valid', 'notValid']);
defineProps({
  serverErrors: {
    required: false
  }
})
const { locale, t } = useI18n();
const { space } = useSpaceStore();
const { fetchParkings, parkings: parkingsArray, loading, error } = useSpaces();
const { fetchAmenities, amenities } = useSpaces();
const selectedAmenities = ref([]);

const type = ref(space?.type.value || '');
const categories = ref([
  { value: 'event_hall', label: t('categories.eventHalls') },
  { value: 'camps', label: t('categories.camps') },
  { value: 'events', label: t('categories.events') },
  { value: 'resting', label: t('categories.lounges') },
]);
const typeLabel = computed(() => {
  if (type.value != '') {
    const obj = categories.value.find(cat => cat.value == type.value);
    return obj.label;
  }
  return t('categories.choose');
});
const { values, errors } = useForm({
  initialValues: {
    title: space ? space.title : '',
    type: space ? space.type : '',
    wifi_username: space ? space.wifi_username : null,
    wifi_password: space ? space.wifi_password : null,
    size: space ? space.size : null,
    parkings: space ? space.parkings.map(obj => obj.id) : [],
    amenities: space ? space.amenities.map(obj => obj.id) : [],
    description: space ? space.description : null,
    rules: space ? space.rules : null,
  },
  validationSchema: yup.object({
    type: yup.string().required(t('validation.type.required')),
    parkings: yup.array().min(1, t('validation.parkings.min')),
    title: yup.string().required(t('validation.title.required')),
    description: yup.string().required(t('validation.description.required')).min(15, t('validation.description.min')),
    size: yup.number().required(t('validation.size.required')).min(10, t('validation.size.min')),
  })
}
);

const validateForm = useValidateForm();
const isValid = useIsFormValid();
const validate = async () => {
  await validateForm();
  if (isValid.value) {
    let form = { ...toRaw(values) }
    // form['amenities'] = toRaw(values).amenities.map(obj => obj.id);
    form['step'] = 2
    
    emit('valid', form);
  } else {
    emit('notValid', 2)
  }
};
defineExpose({
  validate
});

watch(isValid, (value) => {
  if (value) {
    let form = { ...toRaw(values) }
    form['step'] = 2
    emit('valid', form);
  }
});

onMounted(async () => {
  await fetchParkings();
  await fetchAmenities();
  if (space?.amenities?.length > 0) {
    selectedAmenities.value = space.amenities.map((a) => a.id);
  }
})
</script>

<template>
  <div class="border-b border-gray-900/10 pb-8">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{ $t('aboutSpace.title') }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ $t('aboutSpace.subtitle') }}</p>
    </div>
    <div class="mt-10 px-6 sm:px-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
      <div class="sm:col-span-6 p-3 bg-gray-100 rounded-md w-full">
        <legend class="font-semibold leading-6 text-gray-600">{{ $t('spaceType') }}</legend>
        <div class="mt-2">
          <div>
            <RadioGroup v-model="type">
              <div class="mt-4 grid md:grid-cols-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <RadioGroupOption as="template" v-for="cat in categories" :key="cat.label" :value="cat.value"
                  v-slot="{ active, checked }">
                  <div
                    :class="[active ? 'border-zaman ring-2 ring-zaman' : 'border-gray-300', 'w-full relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900 capitalize">{{
                          cat.label }}
                        </RadioGroupLabel>
                      </span>
                    </span>
                    <CheckCircleIcon :class="[!checked ? 'invisible' : '', 'h-5 w-5 text-zaman']" aria-hidden="true" />
                    <span
                      :class="[active ? 'border' : 'border-2', checked ? 'border-zaman' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                      aria-hidden="true" />
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
            <Field class="hidden" name="type" v-model="type" />
          </div>
        </div>
        <ErrorMessage class="text-[red] block mt-2" name="type" />
        <p class="text-[red] block mt-2" v-if="serverErrors['type']" v-text="serverErrors['type'][0]">
        </p>
      </div>

      <div class="sm:col-span-6 p-3 bg-gray-100 rounded-md">
        <legend class="font-semibold leading-6 text-gray-600">
          {{ $t('spaceTitle') }}
        </legend>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t('spaceTitleDescription') }}
        </p>
        <div class="mt-2">
          <Field type="text" id="title" name="title"
            class="block w-full rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </Field>
          <ErrorMessage class="text-[red] block mt-2" name="title" />
          <p class="text-[red] block mt-2" v-if="serverErrors['title']" v-text="serverErrors['title'][0]">
          </p>
        </div>
      </div>

      <div class="sm:col-span-3 p-3 bg-gray-100 rounded-md">
        <label for="space-type" class="font-semibold leading-6 text-gray-600">{{ $t('spaceDescription') }}</label>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t('spaceDescriptionDetails') }}
        </p>
        <div class="mt-2">
          <Field id="description" as="textarea" name="description" rows="3"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </Field>
          <ErrorMessage class="text-[red] block mt-1" name="description" />
          <p class="text-[red] block mt-2" v-if="serverErrors['description']" v-text="serverErrors['description'][0]">
          </p>
        </div>
      </div>

      <div class="sm:col-span-3 p-3 bg-gray-100 rounded-md">
        <fieldset>
          <legend class="font-semibold leading-6 text-gray-600">{{ $t('parkingOptions') }}</legend>
          <p class="mt-1 text-sm text-gray-500">{{ $t('parkingOptionsDescription') }}</p>
          <div class="mt-6 space-y-6">
            <div v-for="(parking, i) in parkingsArray" :key="i" class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <Field :value="parking.id" :id="parking.id" as="input" name="parkings" type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div class="text-sm leading-6">
                <label :for="parking.id" class="font-medium text-gray-500">
                  {{ locale == 'ar' ? parking.name_ar : parking.name }}
                </label>
              </div>
            </div>
            <ErrorMessage class="text-[red] block mt-2" name="parkings" />
            <p class="text-[red] block mt-2" v-if="serverErrors['parkings']" v-text="serverErrors['parkings'][0]">
            </p>
          </div>
        </fieldset>
      </div>
      <div class="sm:col-span-3 p-3 bg-gray-100 rounded-md">
        <label class="font-semibold leading-6 text-gray-600">{{ $t('spaceSize') }}</label>
        <p class="mt-2 text-sm text-gray-500">{{ $t('spaceSizeDescription') }}</p>
        <div class="mt-2">
          <div
            class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600">
            <Field type="number" name="size"
              class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <ErrorMessage class="text-[red] block mt-2" name="size" />
          <p class="text-[red] block mt-2" v-if="serverErrors['size']" v-text="serverErrors['size'][0]">
          </p>
        </div>
      </div>
      <div class="sm:col-span-3 p-3 bg-gray-100 rounded-md">
        <label class="font-semibold leading-6 text-gray-600">

          {{ $t('amenties') }} </label>
        <p class="mt-2 text-sm text-gray-500">{{ $t('amentiesDescription') }}</p>

        <div class="w-1/2">
          <Field class="hidden" type="checkbox" name="amenities" v-model="selectedAmenities" :options="amenities" />
          <ErrorMessage class="text-[red] block mt-2" name="amenities" />
          <p class="text-[red] block mt-2" v-if="serverErrors['amenities']" v-text="serverErrors['amenities'][0]">
        </p>
          <Listbox v-model="selectedAmenities" multiple class="mt-2">
            <div class="relative mt-1 ">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span class="block truncate">{{ selectedAmenities.length > 0 ?
                  amenities
                    .filter(amenitie => selectedAmenities.find(id => id === amenitie.id))
                    .map(amenitie => amenitie.name).join(', ') : (locale == 'ar' ? 'اختر' : 'choose')
                  }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                  class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  <ListboxOption v-slot="{ active, selected }" v-for="amenitie in amenities" :key="amenitie.name"
                    :value="amenitie.id" as="template">
                    <li :class="[
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]">
                      <span :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]">{{ amenitie.name }}</span>
                      <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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


      <div class="sm:col-span-6 p-3 bg-gray-100 rounded-md">
        <label for="space-type" class="text-sm font-semibold leading-6 text-gray-600 text-xl">
          {{ $t('spaceRules') }}
        </label>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t('spaceRulesDescription') }}
        </p>
        <div class="mt-2">
          <Field as="textarea" id="rules" name="rules" rows="3"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </Field>
        </div>
      </div>
    </div>
  </div>
</template>
