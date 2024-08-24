<script setup>
import { ArrowPathIcon, MapIcon, FingerPrintIcon, ClipboardDocumentListIcon, SquaresPlusIcon, TagIcon, ComputerDesktopIcon, DocumentIcon, ChatBubbleOvalLeftIcon, BanknotesIcon } from '@heroicons/vue/24/outline';
const { t } = useI18n()

const features = [
{
  name: t('faq.hostSpace'),
  description: t('faq.hostSpaceDescription'),
  icon: SquaresPlusIcon,
},
{
  name: t('faq.selectDetails'),
  description: t('faq.selectDetailsDescription'),
  icon: TagIcon,
},
{
  name: t('faq.displayAdditionalServices'),
  description: t('faq.displayAdditionalServicesDescription'),
  icon: ComputerDesktopIcon,
},
{
  name: t('faq.instantComprehensiveContract'),
  description: t('faq.instantComprehensiveContractDescription'),
  icon: DocumentIcon,
},
{
  name: t('faq.communicateWithGuests'),
  description: t('faq.communicateWithGuestsDescription'),
  icon: ChatBubbleOvalLeftIcon,
},
{
  name: t('faq.paymentReports'),
  description: t('faq.paymentReportsDescription'),
  icon: BanknotesIcon,
},
];
</script>
<template>
  <div class="py-8 sm:py-12">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <div class="font-bold tracking-tight text-zaman text-2xl">
          {{ $t('common.hostingProcess') }}
        </div>
      </div>
      <div class="mx-auto pt-6 max-w-2xl sm:mt-20 lg:mt-16 lg:max-w-4xl">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <div v-for="feature in features" :key="feature.name" class="relative rtl:pr-16 pl-16">
            <dt class="text-xl leading-7 text-gray-700">
              <div class="absolute rtl:right-0 left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg ">
                <component :is="feature.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              {{ $t(feature.name) }}
            </dt>
            <dd class="mt-2 text-base text-md leading-7 text-gray-600">{{ $t(feature.description) }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
