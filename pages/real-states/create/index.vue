<script setup>

definePageMeta({
    title: 'New-realState',
    // middleware: 'auth'
}) 
function createNewRealState(data){
    console.log('data',data )
}
</script>
<template>
    <div>
        <RealStateForm @submit="createNewRealState"/>
    </div>
</template>