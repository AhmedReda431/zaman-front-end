<script setup>
import { ref, onMounted } from 'vue';
import { useForm, useIsFormValid, useValidateForm, useFieldValue, Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const { t } = useI18n();
const emit = defineEmits(['valid', 'notValid']);
const { locale } = useI18n();
const { space } = useSpaceStore();
const { showAlert } = useAlert();
defineProps({
  serverErrors: {
    required: false
  }
})
const inputs = ref(space ? space?.additional_services : []);
const add = () => { inputs.value.push({ title: '', description: '', price: '' }); };
const remove = () => { inputs.value.pop(); };

const { values, errors } = useForm({
  initialValues: {
    hour_rate: space ? space.hour_rate : undefined,
    extra_charge: space ? space.extra_charge : undefined,
    min_booking_period: space ? space.min_booking_period : undefined,
    max_attend: space ? space.max_attend : undefined,
    discount: space ? space.discount : undefined,
  },
  validationSchema: yup.object({
    hour_rate: yup.number().typeError(t('validation.hourRateRequired')).min(1, t('validation.minHourRate')).required(t('validation.hourRateRequired')),
    max_attend: yup.number().min(1, t('validation.maxAttendMin')).required(t('validation.maxAttendRequired')),
    min_booking_period: yup.number().typeError(t('validation.minBookingPeriodRequired')).min(30, t('validation.minBookingPeriodMin')).required(t('validation.minBookingPeriodRequired')),
    discount: yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).nullable(true).test('is-positive-or-zero', t('validation.numberNotValid'), value => value === 0 || (value && value > 0)),
    extra_charge: yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).nullable(true).test('is-positive-or-zero', t('validation.numberNotValid'), value => value === 0 || (value && value > 0)),
  })
}
);

const validateForm = useValidateForm();
const isValid = useIsFormValid();
const validate = async () => {
  await validateForm();
  if (isValid.value) {
    let formData = { ...toRaw(values) };
    formData['additional_services'] = toRaw(inputs.value);
    
    if (formData.additional_services.length === 0) {
      delete formData.additional_services;
    }
    formData['step'] = 5
    emit('valid', formData);
  } else {
    emit('notValid', 5)
  }
};
defineExpose({
  validate
});
watch(isValid, (value) => {
  if (value) {
    validate();
  }
});
</script>
<template>
  <div class="border-b border-gray-900/10 pb-8">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{ $t('activitiesList') }}
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ $t('activitiesListDescription') }}
      </p>
    </div>
    <div class="p-4 sm:px-6">
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3 gap-x-3 p-3 bg-gray-100 rounded-md">
          <label class="font-semibold leading-6 text-gray-600">
            {{ $t('hourlyRate') }}
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">{{ $t('common.SAR') }}</span>
            </div>
            <Field type="number" name="hour_rate"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00" />
          </div>
          <ErrorMessage class="text-[red] block mt-2" name="hour_rate" />
          <p class="text-[red] block mt-2" v-if="serverErrors['hour_rate']" v-text="serverErrors['hour_rate'][0]">  
          </p>
        </div>

        <div class="sm:col-span-3 gap-x-3 p-3 bg-gray-100 rounded-md">
          <label for="space-type" class="font-semibold leading-6 text-gray-600">
            {{ $t('cleaningFee') }}
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">{{ $t('common.SAR') }}</span>
            </div>
            <Field type="number" name="extra_charge"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00" />
          </div>
          <ErrorMessage class="text-[red] block mt-2" name="extra_charge" />
          <p class="text-[red] block mt-2" v-if="serverErrors['extra_charge']" v-text="serverErrors['extra_charge'][0]">  
          </p>
        </div>

        <div class="sm:col-span-3 p-3 bg-gray-100 rounded-md">
          <label class="font-semibold leading-6 text-gray-600">
            {{ $t('discount') }}
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">{{ $t('common.SAR') }}</span>
            </div>
            <Field type="number" name="discount"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00" />
          </div>
          <ErrorMessage class="text-[red] block mt-2" name="discount" />
          <p class="text-[red] block mt-2" v-if="serverErrors['discount']" v-text="serverErrors['discount'][0]">  
          </p>
        </div>

        <div class="sm:col-span-3 p-3 bg-gray-100 rounded-md">
          <label for="space-type" class="font-semibold leading-6 text-gray-600">
            {{ $t('maxAttendees') }}
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <Field type="number" name="max_attend"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0" />
            <ErrorMessage class="text-[red] block mt-2" name="max_attend" />
            <p class="text-[red] block mt-2" v-if="serverErrors['max_attend']" v-text="serverErrors['max_attend'][0]">  
          </p>
          </div>
        </div>

        <div class="sm:col-span-3 p-3 bg-gray-100 rounded-md">
          <label for="space-type" class="font-semibold leading-6 text-gray-600">
            {{ $t('minBookingPeriod') }}
            <span class="text-gray-600 text-sm mx-2">
              (
              {{ $t('byMins') }}
              )
            </span>
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <Field type="number" name="min_booking_period"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0" />
            <ErrorMessage class="text-[red] block mt-2" name="min_booking_period" />
            <p class="text-[red] block mt-2" v-if="serverErrors['min_booking_period']" v-text="serverErrors['min_booking_period'][0]">  
          </p>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div class="my-2">
          <h2 class="font-semibold leading-6 text-gray-600">
            {{ $t('additionalHostServices') }}
          </h2>
          <div class="flex gap-4 mt-4">
            <Icon name="streamline:interface-edit-layer-add-2-layer-add-design-plus-layers-square-box" size="26"
              class="text-green-500 cursor-pointer" @click="add" />
            <Icon v-show="inputs.length > 0" name="mdi:inbox-remove" size="28" class="text-red-500 cursor-pointer"
              @click="remove()" />
          </div>
        </div>
        <div class="grid gap-4 md:grid-cols-6 items-center">
          <template v-for="input, index in inputs" :key="index">
            <div class="col-span-2">
              <label class="font-semibold leading-6 text-gray-600">
                {{ $t('additionalServiceType') }}
              </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <input type="text" v-model="input.title" class="block w-full rounded-md 
                                    border-0 py-1.5 text-gray-900 
                                    ring-1 ring-inset ring-gray-300 
                                    placeholder:text-gray-400 
                                    focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm 
                                    sm:leading-6">
              </div>
            </div>
            <div class="col-span-2">
              <label class="font-semibold leading-6 text-gray-600">
                {{ $t('additionalServiceDescription') }}
              </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <input type="text" v-model="input.description" class="block w-full rounded-md 
                                    border-0 py-1.5 text-gray-900 
                                    ring-1 ring-inset ring-gray-300 
                                    placeholder:text-gray-400 
                                    focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm 
                                    sm:leading-6">
              </div>
            </div>
            <div class="col-span-2">
              <label class="font-semibold leading-6 text-gray-600">
                {{ $t('additionalServicePrice') }}
              </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-gray-500 sm:text-sm">{{ $t('common.SAR') }}</span>
                </div>
                <input type="text" v-model="input.price"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00">
              </div>
            </div>
          </template>
        </div>
        <p class="text-[red] block mt-2" v-if="serverErrors['additional_services']" v-text="serverErrors['additional_services'][0]">  
          </p>
      </div>
    </div>
  </div>
</template>
