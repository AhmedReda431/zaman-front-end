<script setup>
// import { onMounted, onUnmounted, ref } from 'vue';
// const { fetchRealStateById, loading, realState } = useRealStates()
// const realStateStore = useRealStateStore()
// const route = useRoute()
definePageMeta({
    title: 'New-realState',
    // middleware: 'auth'
})

// loading.value = true
// if (route.params.new != "new") {
//     await fetchRealStateById(route.params.new)
//     realStateStore.setRealState(realState.value);
//     if (realState.value.step == 6) {
//         realStateStore.setStep(1)
//     }
// } else{
//     realStateStore.clearRealState()
// }
// loading.value = false
</script>
<template>
    <div>
        <PageSkeletone v-if="loading" />
        <NewRealEstate />
    </div>
</template>