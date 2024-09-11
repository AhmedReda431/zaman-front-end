<script setup>
import { CheckIcon } from '@heroicons/vue/20/solid';
import { computed, ref, onMounted, markRaw } from 'vue';
import { useStepper } from '@vueuse/core'
import Step1 from './Steps/Step1.vue';
import Step2 from './Steps/Step2.vue';
import Step3 from './Steps/Step3.vue';
import Step4 from './Steps/Step4.vue';
import Step5 from './Steps/Step5.vue';
import Step6 from './Steps/Step6.vue';
const router = useRouter();
const { t } = useI18n();
const { isSpace, clearSpace, step, isUpdate, token, space } = useSpaceStore();
const { newSpace, errors,  space: spaceForRoute, updateSpace, loading, error, success } = useSpaces();
const { showAlert } = useAlert();
const stepRef = ref(null);

let validatedSteps = {
  step1: false,
  step2: false,
  step3: false,
  step4: false,
  step5: false,
  step6: false,
}
let formData = {}
const stepForm = (data) => {
  formData = {}
  validatedSteps[`step${data.step}`] = true
  formData['is_update'] = unref(isUpdate)
  formData = data
}
const notValid = (step) => {
  validatedSteps[`step${step}`] = false
}
const stepper = useStepper({
  'step-1': {
    title: t('steps.location'),
    component: markRaw(Step1),
    isValid: () => validatedSteps.step1,
  },
  'step-2': {
    title: t('steps.aboutSpace'),
    component: markRaw(Step2),
    isValid: () => validatedSteps.step2,
  },
  'step-3': {
    title: t('steps.photos'),
    component: markRaw(Step3),
    isValid: () => validatedSteps.step3,
  },
  'step-4': {
    title: t('steps.workingHours'),
    component: markRaw(Step4),
    isValid: () => validatedSteps.step4,
  },
  'step-5': {
    title: t('steps.activities'),
    component: markRaw(Step5),
    isValid: () => validatedSteps.step5,
  },
  'step-6': {
    title: t('steps.policies'),
    component: markRaw(Step6),
    isValid: () => validatedSteps.step6,
  },
})

async function submit() {
  await stepRef.value.validate();
  if (stepper.current.value.isValid()) {
    if (stepper.isCurrent('step-1') && !isSpace) {
      await newSpace(formData)
      if (success.value) {
        router.push({ path: `/real-states/create/${unref(spaceForRoute).token}` })
        return
      }
    } else {
      if (isSpace) {
        formData['is_update'] = isUpdate
      }
      await updateSpace(formData)
    }
    if (error.value) {
      return
    }
    stepper.goToNext()
  }
}
async function submitLastStep() {
  await stepRef.value.validate();
  if (stepper.current.value.isValid()) {
    if (isSpace) {
      formData['is_update'] = isUpdate
    }
    await updateSpace(formData)
    if (error.value) {
      return
    }
    router.push({ path: "/real-states/done" })
  }
}

function allStepsBeforeAreValid(index) {
  return !Array(index)
    .fill(null)
    .some((_, i) => !stepper.at(i)?.isValid())
}

if (isSpace) {
  for (let key in validatedSteps) {
    if (parseInt(key.replace("step", "")) <= unref(space).step) {
      validatedSteps[key] = true;
    }
  }
  if (unref(space).step == step) {
    stepper.goTo(`step-${step + 1}`)
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="">
      <!-- <LoadingScreen v-if="loading" /> -->
      <div class="mx-auto flex items-center flex-col">
        <nav aria-label="Progress">
          <ol role="list" class="flex items-center py-8">
            <li v-for="(step, id, i) in stepper.steps.value" :key="step.title"
              :class="[stepper.isLast ? 'ltr:pr-8 ltr:sm:pr-20 ltr:md:pr-24 ltr:lg:pr-[132px] rtl:pl-8 rtl:sm:pl-20 rtl:md:pl-24 rtl:lg:pl-[132px]' : '', 'relative']">
              <template v-if="allStepsBeforeAreValid(i) && !stepper.isBefore(id)">
                <template v-if="stepper.isCurrent(id)">
                  <div v-if="id !== 'step-6'" class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-0.5 w-full bg-gray-200" />
                  </div>
                  <button @click="stepper.goTo(id)" :disabled="!allStepsBeforeAreValid(i) && stepper.isBefore(id)"
                    class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-zaman bg-white"
                    aria-current="step">
                    <!-- <span class="h-2.5 w-2.5 rounded-full bg-gray-700" aria-hidden="true" /> -->
                    <span class="text-zaman">{{ i + 1 }}</span>
                    <span class="sr-only">{{ step.title }}</span>
                    <span class="absolute text-gray-700 font-semibold" style="width: max-content; top: 35px">{{
              step.title }}</span>
                  </button>
                </template>

                <template v-else>
                  <div v-if="id !== 'step-6'" class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="h-0.5 w-full bg-zaman" />
                  </div>
                  <button @click="stepper.goTo(id)" :disabled="!allStepsBeforeAreValid(i) && stepper.isBefore(id)"
                    class="relative flex h-8 w-8 items-center justify-center rounded-full bg-zaman hover:bg-zaman">
                    <CheckIcon class="h-5 w-5 text-white" aria-hidden="true" />
                    <span class="sr-only">{{ step.title }}</span>
                    <span class="absolute text-zaman font-semibold" style="width: max-content; top: 35px">{{
              step.title }}</span>
                  </button>
                </template>
              </template>

              <template v-else>
                <div v-if="id !== 'step-6'" class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="h-0.5 w-full bg-gray-200" />
                </div>
                <button @click="stepper.goTo(id)" :disabled="!allStepsBeforeAreValid(i) && stepper.isBefore(id)"
                  class="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                  <!-- <span class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true" /> -->
                  <span class="text-gray-300">{{ i + 1 }}</span>
                  <span class="sr-only">{{ step.title }}</span>
                  <span class="absolute text-gray-500 font-semibold" style="width: max-content; top: 35px">{{
              step.title }}</span>
                </button>
              </template>
            </li>
          </ol>
        </nav>
      </div>
      <div class="bg-white file:my-8 lg:my-12 shadow-md rounded-lg">
        <div>
          <transition name="fade" mode="out-in" :key="stepper.current.value.component">
            <component :serverErrors="errors" ref="stepRef" :is="stepper.current.value.component" :stepper="stepper" @valid="stepForm"
              @notValid="notValid" :key="stepper.current.value.component" />
          </transition>
        </div>

        <div class="flex justify-between py-4 px-4 sm:px-6">
          <button type="button"
            class="flex-none rounded-md bg-gray-500 px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="stepper.goToPrevious()" :disabled="loading">
            {{ $t('steps.previous') }}
          </button>

          <!-- <button type="button"
            class="flex-none rounded-md bg-zaman px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="moveToNextStep" :disabled="loading">
            متابعة
          </button> -->
          <button v-if="!stepper.isLast.value" @click="submit"
            :class="{ 'cursor-not-allowed': loading, 'opacity-50': loading }" :disabled="loading"
            class="flex justify-center rounded-md bg-zaman px-12 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zaman-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zaman-900">
            <span v-if="!loading">
              {{ $t('steps.continue') }}
            </span>
            <span v-if="loading">
              {{ $t('loading') }}
              <IconsLoadingWhite />
            </span>
          </button>
          <button v-if="stepper.isLast.value" @click="submitLastStep"
            :class="{ 'cursor-not-allowed': loading, 'opacity-50': loading }" :disabled="loading"
            class="flex justify-center rounded-md bg-zaman px-12 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zaman-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zaman-900">
            <span v-if="!loading">
              {{ $t('steps.finish') }}
            </span>
            <span v-if="loading">
              {{ $t('loading') }}
              <IconsLoadingWhite />
            </span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
