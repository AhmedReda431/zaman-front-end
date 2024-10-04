<script setup>
definePageMeta({
    title: "Success",
    description: "Your real-state has been created successfully",
    layout: "auth",
    middleware: "auth"
})
</script>


<template>
    <div class="flex flex-col items-center h-full justify-center">
        <div
            class="relative flex items-center justify-center m-5 w-40 h-40 bg-transparent rounded-full p-2 border-2 border-blue-800">
            <Icon name="carbon:thumbs-up-filled" class="w-[95px] h-[95px] flex-shrink-0 text-zaman" />
            <div
                class="absolute flex items-center justify-center w-48 h-48 bg-transparent rounded-full p-2 border-2 border-blue-800 bg-white shadow-md opacity-20">
                <!-- Your icon goes here -->
            </div>
        </div>
        <div class="w-221 h-66 m-5 text-3xl font-bold text-[#07074D]">{{$t('spaces.created')}}</div>
        <div class="py-2 text-xl text-[#07074D]">
            {{$t('spaces.update')}}
        </div>
        <NuxtLink to="/real-states"
            class=" bg-zaman hover:bg-zaman-500 focus:bg-zaman-400 rounded-md py-3 px-8 my-5 w-48 text-center text-base font-semibold text-white">
            {{$t('steps.continue')}}</NuxtLink>

    </div>
</template>

