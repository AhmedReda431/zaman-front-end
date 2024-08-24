<script setup>
import { onMounted } from 'vue';
const { fetchNotifications, markAll, notifications, loading, error, errors } = useNotifications()


onMounted(async () => {
    await fetchNotifications()
})

</script>

<template>
    <div>
        <transition name="fade" mode="out-in">
            <div v-if="notifications.length != 0">
                <!-- <p class="uppercase tracking-wide text-2xl mb-5 text-gray-800 font-semibold">اليوم</p> -->
                <div v-for="notification in notifications" :key="notification.id"
                    class="max-w-2xl  mt-5 border rounded-xl dark:border-gray-700">
                    <div class="flex items-center justify-between px-8 py-4">
                        <!-- <Icon name="material-symbols:account-circle-full" class="w-[50px] h-[50px] flex-shrink-0" color="#86B6F6" />
                    -->
                        <div class="flex flex-col mx-5 space-y-1">
                            <h1 class="text-md">{{ notification.data.title }}</h1>
                            <h2 class="text-sm text-gray-700 dark:text-gray-200">
                                {{ notification.data.body }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="loading" class="flex flex-wrap -mx-3 mb-5">
                <PageSkeletone :many="3" />
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="!loading && notifications.length == 0" class="mx-auto text-center mt-16 text-gray-500">
                <p> {{ $t('noElements') }} </p>
            </div>
        </transition>
    </div>
</template>