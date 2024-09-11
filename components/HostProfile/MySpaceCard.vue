<script setup>
const { hmDate } = useDate()
const { locale } = useI18n()
const { deleteSpace: remove, loading, error } = useSpaces()
const emit = defineEmits(['removed'])
const spaceStore = useSpaceStore()
const router = useRouter()
const props = defineProps({
    space: {
        type: Object,
        required: true
    }
})
const openUpdate = ref(false)
const openDelete = ref(false)

const updateSpace = (id) => {
    openUpdate.value = false
    spaceStore.setToken(props.space.token);
    spaceStore.setSpace(props.space);
    spaceStore.setStep(1);
    router.push({ path: '/real-states/create' })
}
const deleteSpace = async (id) => {
    await remove(id)
    emit('removed', id)
    openDelete.value = false
}
const close = () => { openDelete.value = false; openUpdate.value = false }
</script>

<template>
        <div>
            <div>
                <ModalComponent :header="$t('updateHeader')" :open="openUpdate" :data="space.id"
                    :message="$t('updateSpace')" @close="close" @clicked="updateSpace" />

                <ModalComponent :header="$t('deleteHeader')" :open="openDelete" :data="space.id"
                    :message="$t('deleteSpace')" @close="close" @clicked="deleteSpace" />
            </div>

            <div
                class="relative p-5 shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-2xl mx-auto my-10">

                <div class="flex flex-col sm:flex-row">
                    <div class="h-auto overflow-hidden w-full sm:w-1/2">
                        <div class="h-48 sm:h-auto overflow-hidden relative">
                            <img :src="space.main_image" alt="">
                        </div>
                    </div>
                    <div class="bg-white py-2 px-3 mr-2 flex-grow">
                        <h3 class="block mt-1 text-xl leading-tight font-medium text-black">{{ space.title }} </h3>
                        <div class="flex items-center gap-2 pt-2">
                            <Icon name="material-symbols:home-pin-outline" size="25" color="#86B6F6" />
                            <p class="block mt-1 text-lg leading-tight font-medium text-gray-400">
                                {{ space.address }}
                            </p>
                        </div>
                        <div class="flex items-center gap-2 pt-2">
                            <Icon name="material-symbols-light:calendar-month-outline-sharp" size="25" color="#86B6F6" />
                            <p class="block mt-1 text-lg leading-tight font-medium text-gray-600">
                                اخر تحديث
                                {{ hmDate(space.updated_at) }}
                            </p>
                        </div>
                        <div class="flex items-center gap-2 pt-2" :style="{
                            'color': space.status.value == 'rejected' ? '#dc2626' : (space.status.value == 'published' ? '#84cc16' : '#ffed4a')
                        }">
                            <Icon name="eos-icons:compare-states" size="25" />
                            <p class="block mt-1 text-lg leading-tight font-medium">
                                {{ locale == 'ar' ? space.status.label : space.status.value }}
                            </p>
                        </div>
                    </div>
                </div>
                <hr class="my-3" />



                <div class="max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 sm:px-2">
                    <div class="flex items-center">
                        <h2 class="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">السعر</h2>
                        <h2 class="text-lg px-5 font-medium text-success-700 sm:text-2xl dark:text-success-200">
                            {{ space.hour_rate }} SAR</h2>
                    </div>
                    <div class="flex items-center">
                        <button class="bg-sky-500 text-white mx-1 sm:mx-3 px-4 py-2 rounded-md text-lg font-medium"
                            @click.stop="(event) => {
                                event.preventDefault();
                                event.stopPropagation(); openUpdate = !openUpdate
                            }">تعديل</button>
                        <button @click.stop="(event) => {
                            event.preventDefault();
                            event.stopPropagation(); openDelete = !openDelete
                        }"
                            class="bg-red-500 text-white mx-1 sm:mx-3 px-4 py-2 rounded-md text-lg font-medium">حذف</button>
                    </div>
                </div>

            </div>
        </div>
</template>

