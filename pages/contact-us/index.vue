<template>
    <div class="isolate bg-white px-6 py-10 lg:px-8 relative">
        <div class="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl "
            aria-hidden="true">
            <div class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('contact-us') }}</h2>
        </div>
        <div class="mx-auto mt-10 max-w-xl sm:mt-16">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                    <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">{{ $t("common.name")
                        }}</label>
                    <div class="mt-2.5">
                        <input v-model="itemForm.name" type="name" name="name" id="name" autocomplete="name"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500 text-sm" v-if="errors && errors['name']">{{ errors['name'][0] }}</span>

                </div>
                <div class="sm:col-span-2">
                    <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">{{ $t("common.email")
                        }}</label>
                    <div class="mt-2.5">
                        <input type="email" v-model="itemForm.email" name="email" id="email" autocomplete="email"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500 text-sm" v-if="errors && errors['email']">{{ errors['email'][0] }}</span>

                </div>
                <div class="sm:col-span-2">
                    <label for="phone-number" class="block text-sm font-semibold leading-6 text-gray-900">{{
                $t("common.phone") }}</label>
                    <div class="relative mt-2.5">
                        <input type="tel" v-model="itemForm.phone" name="phone-number" id="phone-number"
                            autocomplete="tel"
                            class="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500 text-sm" v-if="errors && errors['phone']">{{ errors['phone'][0] }}</span>

                </div>
                <div class="sm:col-span-2">
                    <label for="subject" class="block text-sm font-semibold leading-6 text-gray-900">{{
                $t("common.subject") }}</label>
                    <div class="relative mt-2.5">
                        <input type="subject" v-model="itemForm.subject" name="subject" id="subject"
                            autocomplete="subject"
                            class="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500 text-sm" v-if="errors && errors['subject']">{{ errors['subject'][0]
                        }}</span>

                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">{{
                $t("common.description") }}</label>
                    <div class="mt-2.5">
                        <textarea v-model="itemForm.description" name="message" id="message" rows="4"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500 text-sm" v-if="errors && errors['description']">{{
                errors['description'][0] }}</span>

                </div>
            </div>
            <div class="mt-10">
                <button v-if="!loading" type="submit" @click="sendForm"
                    class="block w-full rounded-md bg-zaman-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-zaman-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zaman-600">
                    {{ $t("common.send") }}
                </button>
                <button v-if="loading" :disabled="loading"
                    class="block w-full rounded-md bg-zaman-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-zaman-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zaman-600"
                    type="submit" data-te-ripple-init data-te-ripple-color="light">
                    {{ $t('loading') }}
                    <IconsLoadingWhite />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
const { send, loading, errors, error } = useContactUs()
definePageMeta({
    title: 'Contact us',
    description: 'Contact us page description',
})
const router = useRouter()
const itemForm = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    description: ''
})
const sendForm = async () => {
    await send(itemForm.value)
    if (errors.value) {
        return;
    }
    router.push({ path: "/contact-us/success" })
}
</script>