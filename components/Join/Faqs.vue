<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline';
const { t } = useI18n()
const faqs = [
  {
    question: t("faq.paymentMethod"),
    answer: t("faq.paymentMethodAnswer")
  },
  {
    question: t("faq.cancelReservation"),
    answer: t("faq.cancelReservationAnswer")
  },
  {
    question: t("faq.changePrice"),
    answer: t("faq.changePriceAnswer")
  },
  {
    question: t("faq.cancelSpace"),
    answer: t("faq.cancelSpaceAnswer")
  }
];
</script>
<template>
  <div class="pb-12">
    <div class="mx-auto max-w-7xl px-6 py-6 sm:py-8 lg:px-8 lg:py-12">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-zaman text-center">
          {{ $t('common.faq') }}
        </h2>
        <dl class="mt-12 space-y-6 divide-y divide-gray-900/10">
          <Disclosure as="div" v-for="faq in faqs" :key="faq.question" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-bold leading-7 text-gray-900">{{ $t(faq.question) }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2">
              <p class="text-base leading-7 text-gray-500">{{ $t(faq.answer) }}</p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>
  
