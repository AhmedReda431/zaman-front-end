<script setup>
import { ref, computed } from 'vue';
import * as Yup from 'yup';

definePageMeta({
    title: 'Verify',
    description: 'Verify Otp page description',
    layout: 'auth',
});

const code = ref('')
const email = useRoute().query.email

const { t } = useI18n()
const { showAlert } = useAlert()
const { verifyOtb, loading, error } = useVerify();

async function confirm(){
    await verifyOtb(email, code.value)
}
</script>

<template>
    <section class="h-full">
        <div class="flex min-h-full flex-1">
            <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <NuxtLink to="/">
                            <IconsLogo class="h-14 w-auto " alt="zaman" />
                        </NuxtLink>
                        <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">{{
                            $t('authentication.verifyOtp')
                        }}</h2>

                    </div>

                    <div class="mt-10">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">الكود</label>
                            <input v-model="code"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        </div>
                        <button :class="{ 'cursor-not-allowed': loading, 'opacity-50': loading }" :disabled="loading"
                            class=" my-5 w-full bg-zaman text-white px-3 py-2.5 rounded-md flex items-center justify-center"
                            @click="confirm">
                            <span v-if="!loading">
                                تأكيد
                            </span>
                            <span v-if="loading">
                                {{ $t('loading') }}
                                <IconsLoadingWhite />
                            </span>
                        </button>

                    </div>
                </div>
            </div>
            <div class="relative hidden w-0 flex-1 lg:block">
                <img class="absolute inset-0 h-full w-full object-cover" src="@/assets/img/register.png" alt="" />
            </div>
        </div>
    </section>
</template>