
<script setup>
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const countries = [
    {
        id: 1,
        name: 'SAR',
        icon: 'flag:sa-4x3',
        value: 'ar'
    },
    {
        id: 2,
        name: 'US',
        icon: 'flag:us-4x3',
        value: 'en'
    },
]

const { locale, setLocale } = useI18n()

// Detect locale from browser or cookie
const detectedLocale = locale.value
const selected = ref(countries.find(country => country.value === detectedLocale))

// Set initial locale (optional)
// setLocale(detectedLocale)

const switchLocale = () => {
    setLocale(selected.value['value'])

}

watch(selected, () => {
    switchLocale()
})

</script>
<template>
    <Listbox as="div" v-model="selected" class="flex items-center gap-3">
        
        <div class="relative ">
            <ListboxButton
                class="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900  ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span class="flex items-center" v-if="selected">
                    <Icon size="24" :name="selected.icon" />
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="country in countries" :key="country.id" :value="country"
                        v-slot="{ active, selected }">
                        <li
                            :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                            <div class="flex items-center">
                                <Icon size="24" :name="country.icon" />
                            </div>

                            <span v-if="selected"
                                :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

