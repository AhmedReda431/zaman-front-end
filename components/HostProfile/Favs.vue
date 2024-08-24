<script setup>
import {onMounted} from 'vue'

const {fetchFavs, favs, loading, error} = useFavs()
onMounted( async () => {
    await fetchFavs()
})

</script>
<template>
    <div >
        <transition name="fade" mode="out-in">
            <div v-if="loading" class="grid gap-4 content-evenly md:grid-cols-2 lg:grid-cols-3">
                <CardSkeleton :many="6" />
            </div>
        </transition>
        <transition name="fade" mode="out-in"> 
            <div v-if="!loading && favs.length > 0" class="grid gap-4 content-evenly md:grid-cols-2 lg:grid-cols-3">
                <div v-for="space in favs" :key="space.id" >
                    <Card :space="space" />
                </div>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="!loading && favs.length == 0" class="text-gray-500 mx-auto text-center mt-16">
                <p> {{ $t('noElements') }} </p>
            </div>
        </transition>
    </div>
</template>