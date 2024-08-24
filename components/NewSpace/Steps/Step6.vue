<script setup>
import { useForm, useIsFormValid, useValidateForm, useFieldValue, Form, Field } from 'vee-validate';
import { onMounted, ref } from 'vue';
import * as yup from 'yup';

const { t } = useI18n();
const emit = defineEmits(['valid', 'notValid']);
const { locale } = useI18n();
const { space } = useSpaceStore();
const { fetchTerms, terms: termsArray, loading, error } = useTerms();
defineProps({
  serverErrors: {
    required: false
  }
})
const { values, errors } = useForm({
  initialValues: {
    terms: space ? space.terms.map(obj => obj.id) : [],
  },
}
);

const validateForm = useValidateForm();
const isValid = useIsFormValid();
const validate = async () => {
  await validateForm();
  if (isValid.value) {
    let formData = {...toRaw(values)};
    formData['step'] = 6
    if(formData.terms.length == 0 && unref(termsArray).length == 0){
      delete formData.terms
    }
    emit('valid', formData);
  } else {
    emit('notValid', 6)
  }
};
defineExpose({
  validate
});

onMounted(async () => {
  await fetchTerms({ type: "request_host" });
})

</script>
<template>
  <div>
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{$t('cancellationPolicy.title')}}
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        {{$t('cancellationPolicy.description')}}
      </p>
    </div>
    <div class="px-4 sm:px-6">
      <div class="mt-6 space-y-6">
        <div v-for="(term, i) in termsArray" :key="i">
          <div class="relative flex gap-x-3" v-if="term.is_active">
            <div class="flex h-6 items-center">
              <Field :value="term.id" :id="term.id" as="input" name="terms" type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            </div>
            <div class="text-sm leading-6">
              <label v-html="term.description" :for="term.id" class="font-medium text-gray-500">
              </label>

            </div>
          </div>
        </div>
        <ErrorMessage class="text-[red] block mt-2" name="terms" />
        <p class="text-[red] block mt-2" v-if="serverErrors['terms']" v-text="serverErrors['terms'][0]"></p>
      </div>
    </div>
  </div>
</template>
