<script setup>
import { ref, onMounted } from 'vue'
const { fetchOrders, loading, error, orders, total } = useHostOrders()

onMounted(async () => {
  await fetchOrders()
})
</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        class="flex flex-col items-center justify-center relative p-2 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-lg my-5">
        <div class="flex items-center justify-center flex-col">
          <h2 class="text-lg m-3 font-medium text-gray-700 sm:text-2xl dark:text-gray-200">{{ total }}</h2>
          <h3 class="block mt-1 text-xl m-3 leading-tight font-medium text-black">{{ $t('totalOrders') }}</h3>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-center relative p-2 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-lg my-5">
        <div class="flex items-center justify-center flex-col">
          <h2 class="text-lg m-3 font-medium text-gray-700 sm:text-2xl dark:text-gray-200">0</h2>
          <h3 class="block mt-1 text-xl m-3 leading-tight font-medium text-black">{{ $t('pendingOrders') }}</h3>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-center relative p-2 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-lg my-5">
        <div class="flex items-center justify-center flex-col">
          <h2 class="text-lg font-medium m-3 text-gray-700 sm:text-2xl dark:text-gray-200">0</h2>
          <h3 class="block mt-1 text-xl m-3 leading-tight font-medium text-black">{{ $t('rejectedOrders') }}</h3>
        </div>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div class="flex flex-wrap -mx-3 mb-5">
        <HostProfileOrder v-for="order in orders" :key="order" :order="order" />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="flex flex-wrap -mx-3 mb-5">
        <PageSkeleton :many="3" />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="!loading && orders.length == 0" class="mx-auto text-center mt-16 text-gray-500">
        <p>{{ $t('noItems') }}</p>
      </div>
    </transition>
  </div>
</template>
