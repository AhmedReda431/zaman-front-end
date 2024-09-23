<script setup>

definePageMeta({
    title: 'New-realState',
    middleware: 'auth'
}) 
const { newRealState, success, loading, error, errors } = useRealStates()

async function createNewRealState(data){
    console.log('data',data )
    await newRealState(data)
}
</script>
<template>
    <div>
        <RealStateForm @submit="createNewRealState"/>
    </div>
</template>