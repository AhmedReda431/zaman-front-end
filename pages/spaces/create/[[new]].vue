<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
const { fetchSpaceByToken, loading, space } = useSpaces()
const spaceStore = useSpaceStore()
const route = useRoute()
const token = ref(null)
definePageMeta({
    title: 'New-space',
    middleware: 'host-role'
})

loading.value = true
if (route.params.new != "new") {
    await fetchSpaceByToken(route.params.new)
    spaceStore.setToken(space.value.token);
    spaceStore.setSpace(space.value);
    if (space.value.step == 6) {
        spaceStore.setStep(1)
    }
} else{
    spaceStore.clearSpace()
}
loading.value = false
</script>
<template>
    <div>
        <PageSkeletone v-if="loading" />
        <NewSpace v-if="!loading" defer />
    </div>
</template>