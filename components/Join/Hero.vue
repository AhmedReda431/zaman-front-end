<template>
  <div class="pt-16 sm:pt-24 pb-8 sm:pb-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-zaman font-bold text-center text-2xl">
        {{$t('addWorkspace')}}
      </h2>
      <div class="text-center text-lg text-gray-700 pt-3 pb-12">
        {{$t('withUs.win')}}
      </div>
      <NuxtLink to="/real-states/create"
        class="rounded-md bg-zaman px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zaman-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zaman-800">
        {{$t('common.joinAsHost')}}
      </NuxtLink>
    </div>
  </div>
</template>
