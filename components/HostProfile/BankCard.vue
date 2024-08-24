<script setup>
defineProps({
  bank: {
    type: Object,
    required: true,
  }
})
</script>
<template>
  <div
    class="relative p-2 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-lg my-5">
    <div class="flex items-center justify-center flex-col sm:flex-row">
      <div class="h-auto flex items-center justify-center overflow-hidden w-full sm:w-1/2">
        <Icon name="material-symbols:credit-score-outline" size="52" color="#86B6F6" />
      </div>
      <div class="bg-white py-2 px-1 sm:px-4 flex-grow">
        <h3 class="block mt-1 text-lg font-medium text-black"> {{ bank.beneficiary_name }} </h3>
        <h3 class="block mt-1 text-lg font-medium text-black"> {{ bank.bank_name }} </h3>
        <p class="block mt-1 text-base font-medium text-gray-400">{{ bank.iban }}</p>
      </div>
    </div>
    <!-- <hr class="my-1" />
    <div class="max-w-lg px-1 sm:px-4 flex items-center justify-end">
      <button class="bg-red-500 text-white mx-1 sm:mx-3 px-4 py-2 rounded-md text-lg font-medium">حذف</button>
      <button class="bg-sky-500 text-white mx-1 sm:mx-3 px-4 py-2 rounded-md text-lg font-medium">تعديل</button>
    </div> -->
  </div>
</template>
