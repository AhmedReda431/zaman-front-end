<script setup>
const router = useRouter()
</script>
<template>
  <div class="py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="overflow-hidden py-16 hidden lg:block">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8 justify-between">
          <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('aboutzaman') }}</h2>
            <p class="mt-6 text-xl leading-8 text-gray-600">{{ $t('loremIpsumText') }}</p>
            <p class="mt-6 text-base leading-7 text-gray-600">{{ $t('loremIpsumText') }}</p>
          </div>
          <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                alt="" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
            </div>
            <div
              class="contents lg:col-span-1 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
              <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                <img
                  src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                  alt="" class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
              </div>
              <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                <img
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                  alt="" class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
              </div>
              <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <img
                  src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                  alt="" class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-4 gap-2 sm:grid-cols-2 mx-auto">
        <NuxtLink :to="{ path: '/real-states', query: { type: 'event_hall' } }">
          <div class="flex justify-center gap-2 items-center  h-20 text-zaman bg-zaman/10 shadow 
          hover:bg-zaman hover:text-zaman-50 border border-zaman/20 rounded cursor-pointer">
            <Icon size="28" name="game-icons:greek-temple" />
            <h2 class="font-semibold">
              {{ $t('categories.eventHalls') }}
            </h2>
          </div>
        </NuxtLink>
        <NuxtLink :to="{ path: '/real-states', query: { type: 'camps' } }">
          <div
            class="flex justify-center gap-2 items-center  h-20 text-zaman bg-zaman/10 shadow hover:bg-zaman hover:text-zaman-50 border border-zaman/20 rounded cursor-pointer">
            <Icon size="28" name="game-icons:greek-temple" />
            <h2 class="font-semibold">
              {{ $t('categories.camps') }}
            </h2>
          </div>
        </NuxtLink>
        <NuxtLink :to="{ path: '/real-states', query: { type: 'events' } }">
          <div
            class="flex justify-center gap-2 items-center  h-20 text-zaman bg-zaman/10 shadow hover:bg-zaman hover:text-zaman-50 border border-zaman/20 rounded cursor-pointer">
            <Icon size="28" name="game-icons:greek-temple" />
            <h2 class="font-semibold">
              {{ $t('categories.events') }}
            </h2>
          </div>
        </NuxtLink>
        <NuxtLink :to="{ path: '/real-states', query: { type: 'resting' } }">
          <div
            class="flex justify-center gap-2 items-center  h-20 text-zaman bg-zaman/10 shadow hover:bg-zaman hover:text-zaman-50 border border-zaman/20 rounded cursor-pointer">
            <Icon size="28" name="game-icons:greek-temple" />
            <h2 class="font-semibold">
              {{ $t('categories.lounges') }}
            </h2>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>