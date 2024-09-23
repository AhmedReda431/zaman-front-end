<script setup>
const { fetchRealStates, realStates, loading, success, error } = useRealStates();

onMounted(async () => {
  await fetchRealStates();
  console.log("realStates", realStates.value)
})
</script>

<template>
  <div class="pt-20 mb-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-2xl font-semibold leading-7 mb-6 pb-4 border-b-2">{{ $t('latestOffers') }}</h2>
      </div>
      <div class="mt-8 grid grid-cols-4 gap-x-4" v-if="realStates.real_estates && realStates.real_estates.length > 0">
        <NuxtLink v-for="item in realStates.real_estates.slice(0, 4)" :key="item.id" :to="`/real-states/${item.id}`">
          <OfferCard :offer="item" class="my-4" />
        </NuxtLink>
      </div>
      <div v-if="loading" class="mt-8 grid grid-cols-4 gap-4 mb-5">
        <CardSkeleton v-for="i in 4" :key="i" />
      </div>

      <div v-if="!loading && (!realStates.real_estates || realStates.real_estates.length == 0)"
        class="mt-8 w-full text-center mb-5">
        <h2>
          لا يوجد عناصر
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .text-secondary {
    color: #FF6347;
    /* Example color */
  }
}
</style>
