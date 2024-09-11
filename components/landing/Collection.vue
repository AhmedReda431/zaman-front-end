<script setup>
import { onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";
const router = useRouter();
const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 1024);

const { fetchRegions, regions, loading, error, } = useRegions();
const { locale } = useI18n();

const regionChunks = computed(() => {
  const chunkSize = 5;
  return regions.value.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
});


onMounted(async () => {
  await fetchRegions();
});

</script>

<template>
  <div class="py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-semibold leading-7 text-zaman mb-6">
        {{ $t('citiesWeIn') }}
      </h2>
      <div v-if="isMobile">
        <!-- swiper here -->
        <SwiperComponent :slides="regions" effect="creative" />

      </div>

      <div v-else class="mt-6 space-y-8 ">
        <div v-for="(chunk, chunkIndex) in regionChunks" :key="chunkIndex"
          :class="{ 'five-item-chunk': chunk.length === 5 }" class="lg:grid lg:grid-cols-3 lg:gap-6">
          <div @click="router.push({ path: '/real-states', query: { region_id: region.id } })" v-for="(region, index) in chunk"
            :key="index" class="cursor-pointer img-grid group relative w-full">
            <div
              class=" relative h-full w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1   ">
              <img :src="region.image" :alt="region.name" class="h-full w-full object-cover object-center">
            </div>
            <span class="absolute text-x-lg bottom-8 left-5 font-semibold text-white">
              {{ locale == 'ar' ? region.name_ar : region.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.five-item-chunk:nth-child(odd) {
  direction: ltr;
}

.five-item-chunk:nth-child(even) {
  direction: rtl;
}

.five-item-chunk .img-grid:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}

.five-item-chunk .img-grid:nth-child(2) {
  grid-column-start: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

.five-item-chunk .img-grid:nth-child(3) {
  grid-column-start: 1;
}

.five-item-chunk .img-grid:nth-child(5) {
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 3;
}
</style>