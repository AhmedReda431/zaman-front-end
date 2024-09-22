<script setup>
import defaultAvatar from '@/assets/img/green.png';
import { ref, onMounted, computed } from 'vue';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
  , Menu, MenuButton, MenuItem, MenuItems
} from '@headlessui/vue';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  LockClosedIcon,
  Squares2X2Icon,
  SquaresPlusIcon,
  XMarkIcon, HomeIcon
} from '@heroicons/vue/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, UserIcon } from '@heroicons/vue/20/solid';
const { locale } = useI18n();
const { logout } = useLogout();
const router = useRouter();
const mobileMenuOpen = ref(false);
router.beforeEach(() => {
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
  }
});

const isAuthenticated = computed(() => useAuthStore().isAuthenticated);
const user = computed(() => useAuthStore().user);
const route = useRoute();


</script>

<template>
  <div>
    <div class="bg-white">
      <header class="bg-white relative">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div class="hidden lg:flex">
            <NuxtLink href="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <IconsLogo class="h-14 w-auto " main_color='#21499f' alt="zaman" />
            </NuxtLink>
          </div>

          <div class="flex items-center gap-x-12">
            <div class="hidden lg:flex lg:gap-x-12 lg:items-center">

              <NuxtLink :to="{ path: '/' }" :class="{ 'border-b-2 border-b-zaman text-zaman-900': route.path == '/' }"
                class="text-sm font-semibold leading-6  hover:text-gray-500">
                <div class="flex items-center gap-x-1">
                  {{ $t('mainPage') }}
                </div>
              </NuxtLink>

              <NuxtLink :to="{ path: '/real-states' }" :class="{ 'border-b-2 border-b-zaman text-zaman-900': route.path.includes('/real-states') }"
                class="text-sm font-semibold leading-6 text-gray-600 hover:text-gray-500">
                <div class="flex items-center gap-x-1">
                  {{ $t('realEstateOffers') }}
                </div>
              </NuxtLink>

              <NuxtLink class="text-sm font-semibold leading-6 text-gray-600 hover:text-gray-500" :class="{ 'border-b-2 border-b-zaman text-zaman-900': route.path.includes('/about-us') }">
                <div class="flex items-center gap-x-1">
                  {{ $t('aboutUs') }}
                </div>
              </NuxtLink>

              <NuxtLink :to="{ path: '/contact-us' }"
                class="text-sm font-semibold leading-6 text-gray-600 hover:text-gray-500">
                <div class="flex items-center gap-x-1">
                  {{ $t('contact-us') }}
                </div>
              </NuxtLink>


              <NuxtLink :to="{ path: '/login' }" v-if="!isAuthenticated"
                class="rounded-md text-secondary px-6 py-3 text-sm font-semibold bg-transparent border-2 border-secondary shadow-sm hover:bg-secondary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zaman-700">
                <span class="sr-only">Login</span>
                <div class="flex items-center gap-x-1">
                  <UserIcon class="h-5 w-5" aria-hidden="true" />
                  {{ $t('authentication.login') }}
                </div>
              </NuxtLink>
              <NuxtLink :to="{ path: '/real-states/create' }"
                class="rounded-md bg-zaman px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zaman-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zaman-700">
                <div class="flex items-center gap-x-1">
                  <HomeIcon class="h-5 w-5 flex-none text-white" aria-hidden="true" />
                  {{ $t('addYourBuilding') }}
                </div>
              </NuxtLink>
            </div>
            <LangSwitch />
            <div class="flex items-center justify-center">
              <Menu as="div" class="relative ml-3" v-if="isAuthenticated">
                <MenuButton class="relative flex items-center rounded-ful text-sm">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img class="inline-block h-10 w-10 rounded-full" style="object-fit: cover;"
                    :src="user?.avatar || defaultAvatar" alt="User avatar" />
                  <div class="text-gray-700 mx-3 font-semibold hidden lg:block">
                    {{ user?.name }}
                  </div>

                </MenuButton>
                <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-slot="{ active }">

                    <NuxtLink v-if="user?.role.value == 'host'" :to="{ name: 'host-profile', params: { page: 'info' } }"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                      {{ $t('profile.profile') }}
                    </NuxtLink>

                    <NuxtLink v-else :to="{ name: 'profile', params: { page: 'info' } }"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                      {{ $t('profile.profile') }}
                    </NuxtLink>

                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                    <button @click="logout"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-right']">{{
                        $t('signOut')
                      }}</button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>

          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
          <div class="fixed inset-0 z-10" />

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">

            <DialogPanel :dir="locale == 'ar' ? 'rtl' : 'ltr'"
              class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div class="flex items-center justify-between">
                <NuxtLink href="/" class="-m-1.5 p-1.5">
                  <span class="sr-only">Your Company</span>
                  <IconsLogo class="h-8 w-auto " main_color='#21499f' alt="zaman" />
                </NuxtLink>
                <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="mt-6 flow-root">
                <div class="-my-6 divide-y divide-gray-500/10">
                  <div class="py-6">
                    <NuxtLink :to="{ path: '/real-states' }"
                      class="text-xl font-semibold leading-6 text-gray-900 hover:text-gray-500">
                      <div class="flex items-center gap-x-1">
                        {{ $t('spaces.spaces') }}
                      </div>
                    </NuxtLink>
                  </div>
                </div>
                <div class="-my-6 divide-y divide-gray-500/10">
                  <div class="py-6">
                    <NuxtLink :to="{ path: '/contact-us' }"
                      class="text-xl font-semibold leading-6 text-gray-900 hover:text-gray-500">
                      <div class="flex items-center gap-x-1">
                        {{ $t('contact-us') }}
                      </div>
                    </NuxtLink>
                  </div>
                </div>
                <div class="-my-6 divide-y divide-gray-500/10">
                  <div class="py-6">
                    <NuxtLink :to="{ path: '/real-states/create' }"
                      class="text-xl font-semibold leading-6 text-gray-900 hover:text-gray-500">
                      <span class="sr-only">add space</span>
                      <div class="flex items-center gap-x-1">
                        <SquaresPlusIcon class="h-5 w-5 " aria-hidden="true" />
                        {{ $t('addWorkspace') }}
                      </div>
                    </NuxtLink>
                  </div>
                </div>
                <div class="-my-6 divide-y divide-gray-500/10">
                  <div class="py-6">
                    <NuxtLink :to="{ path: '/login' }" v-if="!isAuthenticated"
                      class="text-xl font-semibold leading-6 text-gray-900 hover:text-gray-500">
                      <span class="sr-only">Login</span>
                      <div class="flex items-center gap-x-1">
                        <LockClosedIcon class="h-5 w-5" aria-hidden="true" />
                        {{ $t('authentication.login') }}
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </transition>
        </Dialog>
      </header>
    </div>
  </div>
</template>