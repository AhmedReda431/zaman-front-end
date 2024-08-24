<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import ProfileInfo from './Info.vue'
// import ProfileFavs from './Favs.vue'
import Orders from './Orders.vue'
import MySpaces from './MySpaces.vue'
import ProfileNotifications from './Notifications.vue'
import ProfileSettings from './Settings.vue'
import PaymentWays from './PaymentWays.vue'
import Statistics from './Statistics.vue'
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
    XMarkIcon,
} from '@heroicons/vue/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, UserIcon } from '@heroicons/vue/20/solid';

const { t } = useI18n();

const currentComponent = shallowRef(ProfileInfo);
function switchComponent(component) {
    currentComponent.value = component;
}
</script>

<template>
    <section class="mx-auto grid md:grid-cols-8 max-w-7xl p-6 gap-10 lg:px-8">
        <!-- start mobile menu -->
        <ClientOnly>
            <Menu as="div" class="relative ml-3 md:hidden block  ">
                <div>
                    <MenuButton class="relative flex  text-sm  text-gray-800 ">
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">Open menu</span>
                        <Icon size="32" name="solar:hamburger-menu-broken" />
                    </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute z-20 mt-2 w-56 origin-top-right rounded-md bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                        <MenuItem>
                        <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                            style="min-width: max-content"
                            :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === ProfileInfo }"
                            @click="switchComponent(ProfileInfo)">
                            <Icon size="24" name="material-symbols:person-2-outline-rounded" />
                            {{ t('profile.personalInfo') }}
                        </button>
                        </MenuItem>
                        <MenuItem>
                        <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                            style="min-width: max-content"
                            :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === Statistics }"
                            @click="switchComponent(Statistics)">
                            <Icon size="24" name="material-symbols-light:calendar-month-sharp" />
                            {{ t('profile.reservations') }}
                        </button>
                        </MenuItem>
                        <MenuItem>
                        <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                            style="min-width: max-content"
                            :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === MySpaces }"
                            @click="switchComponent(MySpaces)">
                            <Icon size="24" name="material-symbols:favorite-outline" />
                            {{ t('profile.favorites') }}
                        </button>
                        </MenuItem>
                        <!-- <MenuItem>
                        <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                            style="min-width: max-content"
                            :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === ProfileFavs }"
                            @click="switchComponent(ProfileFavs)">
                            <Icon size="24" name="material-symbols:favorite-outline" />
                            {{ t('profile.favorites') }}
                        </button>
                        </MenuItem> -->
                        <MenuItem>
                        <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                            style="min-width: max-content"
                            :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === Orders }"
                            @click="switchComponent(Orders)">
                            <Icon size="24" name="material-symbols-light:calendar-month-sharp" />
                            {{ t('profile.orders') }}
                        </button>
                        </MenuItem>
                        <MenuItem>
                        <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                            style="min-width: max-content"
                            :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === ProfileNotifications }"
                            @click="switchComponent(ProfileNotifications)">
                            <Icon size="24" name="material-symbols:notifications-outline" />
                            {{ t('profile.notifications') }}
                        </button>
                        </MenuItem>
                        <MenuItem>
                        <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                            style="min-width: max-content"
                            :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === PaymentWays }"
                            @click="switchComponent(PaymentWays)">
                            <Icon size="24"
                                name="streamline:money-atm-card-1-credit-pay-payment-debit-card-finance-plastic-money" />
                            {{ t('profile.paymentsWays') }}
                        </button>
                        </MenuItem>
                        <MenuItem>
                        <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                            style="min-width: max-content"
                            :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === ProfileSettings }"
                            @click="switchComponent(ProfileSettings)">
                            <Icon size="24" name="material-symbols:settings-outline" />
                            {{ t('profile.accountSettings') }}
                        </button>
                        </MenuItem>
                    </MenuItems>
                </transition>
            </Menu>
        </ClientOnly>
        <!-- end mobile menu -->

        <div class="md:block hidden py-6 bg-white shadow-md rounded-lg col-span-2">
            <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                style="min-width: max-content"
                :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === ProfileInfo }"
                @click="switchComponent(ProfileInfo)">
                <Icon size="24" name="material-symbols:person-2-outline-rounded" />
                {{ t('profile.personalInfo') }}
            </button>
            <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                style="min-width: max-content"
                :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === Statistics }"
                @click="switchComponent(Statistics)">
                <Icon size="24" name="material-symbols-light:calendar-month-sharp" />
                {{ t('profile.statistics') }}
            </button>
            <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                style="min-width: max-content" :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === MySpaces }"
                @click="switchComponent(MySpaces)">
                <Icon size="24" name="material-symbols:home-pin-outline" />
                {{ t('profile.mySpaces') }}
            </button>
            <!-- <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                style="min-width: max-content"
                :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === ProfileFavs }"
                @click="switchComponent(ProfileFavs)">
                <Icon size="24" name="material-symbols:favorite-outline" />
                {{ t('profile.favorites') }}
            </button> -->
            <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                style="min-width: max-content" :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === Orders }"
                @click="switchComponent(Orders)">
                <Icon size="24" name="material-symbols-light:calendar-month-sharp" />
                {{ t('profile.orders') }}
            </button>
            <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                style="min-width: max-content"
                :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === ProfileNotifications }"
                @click="switchComponent(ProfileNotifications)">
                <Icon size="24" name="material-symbols:notifications-outline" />
                {{ t('profile.notifications') }}
            </button>
            <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                style="min-width: max-content"
                :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === PaymentWays }"
                @click="switchComponent(PaymentWays)">
                <Icon size="24" name="streamline:money-atm-card-1-credit-pay-payment-debit-card-finance-plastic-money" />
                {{ t('profile.paymentsWays') }}
            </button>
            <button class="block hover:bg-gray-100 w-full text-start px-4 py-3 rounded-sm"
                style="min-width: max-content"
                :class="{ 'text-zaman bg-gray-100': toRaw(currentComponent) === ProfileSettings }"
                @click="switchComponent(ProfileSettings)">
                <Icon size="24" name="material-symbols:settings-outline" />
                {{ t('profile.accountSettings') }}
            </button>
        </div>
        <div class="col-span-6">
            <transition name="fade" mode="out-in">
                <component class="flex flex-col items-center md:block bg-white shadow-md h-full rounded-lg p-6"
                    :is="currentComponent" key="currentComponent"></component>
            </transition>
        </div>
    </section>
</template>
