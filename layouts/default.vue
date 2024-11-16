<template>
  <div class="flex flex-col min-h-screen bg-gray-50" :class="`locale-${$i18n.locale}`">
    <Header />
    <main class="flex-1 w-full mx-auto z-0">

      <slot />
    </main>
    <Footer />
  </div>
</template>
