<script setup>
import { onMounted } from 'vue'
import defaultAvatar from '@/assets/img/green.png';
definePageMeta({
    title: "host-page",
    description: "the host page description",
})
const { fetchData, data, loading, error } = useHost()
const route = useRoute()
onMounted(async () => {
    await fetchData(route.params.id)
})

</script>
<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div>
            <div class="md:m-10 sm:mb-5">
                <div class="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow">

                    <div>
                        <div class="md:flex">
                            <div class="md:flex-shrink-0">

                                <img class="h-24 w-24 rounded-2xl" style="object-fit: cover;"
                                    :src="data?.avatar || defaultAvatar" alt="User avatar" />
                            </div>
                            <div class="p-8">
                                <p class="uppercase tracking-wide text-lg text-sky-400 font-semibold">
                                    {{ $t('hostName') }}
                                </p>
                                <p class="block mt-1 text-xl leading-tight font-medium text-black"> {{ data.name }} </p>
                            </div>
                        </div>


                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-1/2">
                            <div class="flex items-center gap-2 ">
                                <Icon name="material-symbols:mark-email-read-outline" size="25" style="color: #009688;" />
                                <p class="block mt-1 text-lg leading-tight font-medium text-black">{{ data.email }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon name="fluent:phone-checkmark-20-filled" size="25" style="color: #009688;" />
                                <p class="block mt-1 text-lg leading-tight font-medium text-black">{{ data.phone }} </p>
                            </div>
                        </div>

                        <div class="pt-4 " v-if="data.bio">
                            <p class="mt-2 text-gray-700">حول</p>
                            <p class="mt-2 text-gray-500">
                                {{ data.bio }}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div v-if="loading" class="grid gap-4  content-evenly md:grid-cols-2 lg:grid-cols-3 mt-4">
                <CardSkeleton :many="6" />
            </div>
        </transition>
        <div v-if="!loading && data?.spaces" class="grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="space in data.spaces" :key="space.id">
                <Card :space="space" />
            </div>
        </div>
    </div>
</template>
