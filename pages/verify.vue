<script setup>
import { ref, computed } from 'vue';
import * as Yup from 'yup';

definePageMeta({
    title: 'Verify',
    description: 'Verify Otp page description',
    layout: 'auth',
});

const { t } = useI18n()
const { showAlert } = useAlert()
const { verifyOtp, loading, error } = useVerify();

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
                        <div class="mt-2 text-sm leading-6 text-gray-500">
                            <div class="font-semibold text-gray-500">{{ $t("authentication.pleaseRegister") }}</div>
                        </div>
                    </div>

                    <div class="mt-10">
                        <div>
                            test
                        </div>

                        <div class="mt-10">
                            <div class="relative">
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div class="w-full border-t border-gray-200" />
                                </div>
                                <div class="relative flex justify-center text-sm font-medium leading-6">
                                    <span class="bg-white px-6 text-gray-900">{{ $t('authentication.or') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>