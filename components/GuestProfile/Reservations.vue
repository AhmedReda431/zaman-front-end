<script setup>

import { ref, computed } from 'vue'
const { fetchReservations, reservations, loading, error } = useGuestReservations()

const statusFilter = ref('all')

const filteredReservations = computed(() => {
  if (statusFilter.value === 'all') {
    return reservations.value
  }
  if (statusFilter.value === 'open') {
    return reservations.value.filter(s => s.status.value === 'open')
  }
  if (statusFilter.value === 'completed') {
    return reservations.value.filter(s => s.status.value === 'completed')
  }
  return reservations.value
})

onMounted(async () => {
  await fetchReservations()
})
</script>
<template>
  <div>


    <div class="mb-4">
      <nav class="flex flex-col sm:flex-row">
        <button @click="statusFilter = 'all'" class="text-gray-600 py-4 px-6 block hover:text-sky-500 focus:outline-none"
        :class="{ 'text-sky-500 border-b-2 font-medium border-sky-500': statusFilter === 'all' }">
        {{ $t('allReservations') }}
      </button>
        <button @click="statusFilter = 'open'"
        class="text-gray-600 py-4 px-6 block hover:text-sky-500 focus:outline-none"
        :class="{ 'text-sky-500 border-b-2 font-medium border-sky-500': statusFilter === 'open' }">
      {{ $t('uncompletedReservations') }}
      </button>
        <button @click="statusFilter = 'completed'"
        class="text-gray-600 py-4 px-6 block hover:text-sky-500 focus:outline-none"
        :class="{ 'text-sky-500 border-b-2 font-medium border-sky-500': statusFilter === 'completed' }"> {{ $t('completedReservations') }}
        </button>

      </nav>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="filteredReservations.length > 0">
        <div v-for="reservation in filteredReservations" :key="reservation.id">
          <GuestProfileReservationCard  :reservation="reservation" />
        </div>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="grid gap-4 content-evenly md:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton :many="6" />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="!loading && filteredReservations.length == 0" class="mx-auto text-center mt-16 text-gray-500">
        <p> {{ $t('noElements') }}  </p>
      </div>
    </transition>

  </div>
</template>
  