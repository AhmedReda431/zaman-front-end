<script setup>
import { Form, Field, useForm } from 'vee-validate';
import RadioGroup from './RadioGroup.vue';
const { t } = useI18n();
import * as Yup from 'yup';
const validateRole = (value) => {
  if (!value) {
    return t('validation.role.required');
  }
  return true;
};

const { serverError } = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  formValues: {
    type: Object,
    required: false,
  },
  serverError: {
    type: Object,
    required: false,
    default: {},
  },
  register: {
    type: Boolean,
    required: false,
    default: false
  },
});


</script>
<template>
  <Form :initial-values="formValues" v-slot="{ errors }">
    <div v-if="register">
      <RadioGroup name="account_type" class="w-full" :rules="validateRole" />
      <ErrorMessage class="text-[#dc4c64]" name="account_type" />

    </div>
    <div v-for="{ as, name, label, placeholder, children, ...attrs } in schema.fields" :key="name" class="mb-4">
      <label :for="name">{{ label }}</label>
      <Field :class="{ 'border-red-500': errors[name] }"
        class="block w-full rounded-md border-0 py-1.5 mt-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :placeholder="placeholder" :as="as" :id="name" :name="name" v-bind="attrs">
        <template v-if="children && children.length">
          <component v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" :is="tag" v-bind="childAttrs">
            {{ text }}

          </component>
        </template>
      </Field>
      <span class="text-red-500" v-if="serverError && serverError[name]">{{ serverError[name][0] }}</span>
      <ErrorMessage class="text-[#dc4c64]" :name="name" />
    </div>
    <slot name="buttuns"></slot>
  </Form>
</template>