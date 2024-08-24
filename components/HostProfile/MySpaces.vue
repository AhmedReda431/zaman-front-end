<script setup>

import { ref, computed } from 'vue'
const { fetchUserSpaces, spaces, loading, error } = useSpaces()

const statusFilter = ref('all')

const filteredSpaces = computed(() => {
  if (statusFilter.value === 'all') {
    return spaces.value
  }
  if (statusFilter.value === 'published') {
    return spaces.value.filter(s => s.status.value === 'published')
  }
  if (statusFilter.value === 'pending') {
    return spaces.value.filter(s => s.status.value === 'pending')
  }
  if (statusFilter.value === 'rejected') {
    return spaces.value.filter(s => s.status.value === 'rejected')
  }
  if (statusFilter.value === 'draft') {
    return spaces.value.filter(s => s.status.value === 'draft')
  }
  return spaces.value
})

onMounted(async () => {
  await fetchUserSpaces()
})
</script>

<template>
  <div>
    <div class="flex">
      <button @click="statusFilter = 'all'" class="text-gray-600 py-4 px-6 block hover:text-sky-500 focus:outline-none"
        :class="{ 'text-sky-500 border-b-2 font-medium border-sky-500': statusFilter === 'all' }">
        {{ $t('allSpaces') }}
      </button>

      <button @click="statusFilter = 'published'"
        class="text-gray-600 py-4 px-6 block hover:text-sky-500 focus:outline-none"
        :class="{ 'text-sky-500 border-b-2 font-medium border-sky-500': statusFilter === 'published' }">
        {{ $t('published') }}
      </button>

      <button class="text-gray-600 py-4 px-6 block hover:text-sky-500 focus:outline-none"
        @click="statusFilter = 'pending'"
        :class="{ 'text-sky-500 border-b-2 font-medium border-sky-500': statusFilter === 'pending' }">
        {{ $t('pendingReview') }}
      </button>

      <button class="text-gray-600 py-4 px-6 block hover:text-sky-500 focus:outline-none" @click="statusFilter = 'draft'"
        :class="{ 'text-sky-500 border-b-2 font-medium border-sky-500': statusFilter === 'draft' }">
        {{ $t('draft') }}
      </button>

      <button class="text-gray-600 py-4 px-6 block hover:text-sky-500 focus:outline-none"
        @click="statusFilter = 'rejected'"
        :class="{ 'text-sky-500 border-b-2 font-medium border-sky-500': statusFilter === 'rejected' }">
        {{ $t('rejected') }}
      </button>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="filteredSpaces.length > 0" class="mt-3 grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-2 ">
        <div v-for="space in filteredSpaces" :key="space.id">
          <Card :host-only="true" @deleted="async () => await fetchUserSpaces() " :space="space" />
        </div>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="grid gap-4  content-evenly md:grid-cols-2 lg:grid-cols-3 mt-4">
        <CardSkeleton :many="6" />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="(filteredSpaces.length == 0 || !filteredSpaces) && !loading" class="my-12">
        <div class="flex flex-col items-center justify-center">
          <p class="text-xl font-medium text-stone-600">
            {{ $t('noSpaces') }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>