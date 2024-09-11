<script setup>
import { CheckCircleIcon, CircleStackIcon } from "@heroicons/vue/20/solid";
import { UserGroupIcon, MapPinIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
const { locale, t } = useI18n();
const { toggleFav } = useFavs();
const { showAlert } = useAlert();
const { deleteSpace: remove, loading, error } = useSpaces()

const router = useRouter()
const route = useRoute()
const { isAuthenticated, user, setRedirectRoute } = useAuthStore();
const spaceStore = useSpaceStore()
const props = defineProps({
  space: {
    type: Object,
    required: true
  },
  hostOnly: {
    type:Boolean,
    required: false,
    default: false
  }
});
const emit = defineEmits(['removed', 'deleted']);

const openUpdate = ref(false)
const openDelete = ref(false)

const updateSpace = (id) => {
  openUpdate.value = false
  spaceStore.setUpdate(true)
  router.push({ path: `/real-states/update/${id}`})
}
const deleteSpace = async (id) => {
  await remove(id)
  emit('deleted', id)
  openDelete.value = false
}
const close = () => { openDelete.value = false; openUpdate.value = false }


const faved = ref(props.space.is_favorite);
const fav = (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (!isAuthenticated) {
    setRedirectRoute(route.path)
    router.push({ path: '/login' })
    return;
  }
  toggleFav(props.space.id);
  faved.value = !faved.value;
  emit('removed', props.space.id);
};
</script>
<template>
  <NuxtLink :to="space.status.value == 'published' ? { path: `/state/${space.id}` } : ''" class="h-full relative">
    
    <div>
      <ModalComponent :header="$t('updateHeader')" :open="openUpdate" :data="space.id" :message="$t('updateSpace')"
        @close="close" @clicked="updateSpace" />

      <ModalComponent :header="$t('deleteHeader')" :open="openDelete" :data="space.id" :message="$t('deleteSpace')"
        @close="close" @clicked="deleteSpace" />
    </div>
    <div
      class="h-full relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full">
      
      <span v-if="loading" @click.stop="(event) => {event.stopPropagation(); event.preventDefault()}" class="bg-[#00000066] flex justify-center items-center z-50 w-full h-full absolute">
        <IconsLoadingWhite  />
  
      </span>
      
      <button v-if="user?.role?.value != 'host'" @click.stop="fav"
        class="hover:text-zaman absolute z-30 top-2 left-0 mt-2 rtl:ml-3 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" :fill="faved ? 'red' : 'none'" viewBox="0 0 24 24" stroke-width="1.5"
          :stroke="faved ? 'red' : 'currentColor'" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>
      <button v-if="hostOnly" @click.stop="(event) => {
        event.preventDefault();
        event.stopPropagation(); openUpdate = !openUpdate
      }">
        <Icon name="material-symbols:edit-square-outline-rounded" size="30" 
          class=" text-[#4caf50] hover:text-zaman absolute z-30 top-2 left-0 mt-2 rtl:ml-3 mr-3" />
      </button>
      <button v-if="hostOnly" @click.stop="(event) => {
        event.preventDefault();
        event.stopPropagation(); openDelete = !openDelete
      }">
        <Icon name="material-symbols:delete-forever-outline" size="30"
          class=" text-[#c0392b] hover:text-[#e74c3c] absolute z-30 top-2 left-10 mt-2 rtl:ml-3 mr-3" />
      </button>
      <div class="h-auto overflow-hidden">
        <div class="h-44 overflow-hidden relative">
          <img :src="space.main_image" alt="">
        </div>
      </div>
      <div class="bg-white">
        <div class="p-6">
          <h3 class="text-xl leading-tight font-medium text-zaman">
            {{ space.title }}
          </h3>
          <div class="py-4 relative z-40 flex items-center justify-between">
            <div class="flex items-center gap-2 pl-10">
              <MapPinIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              <div class="text-gray-600">
                {{ locale == 'ar' ? space.region_ar : space.region }}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UserGroupIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              <div class="text-gray-600">
                {{ space.max_attend }}
              </div>
            </div>

            
          </div>
          <div class="flex items-center gap-2 pt-2" v-if="hostOnly" :style="{
            'color': space.status.value == 'rejected' ? '#dc2626' : (space.status.value == 'published' ? '#84cc16' : '#ffed4a')
          }">
            <Icon name="eos-icons:compare-states" size="25" />
            <p class="block mt-1 text-lg leading-tight font-medium">
              {{ locale == 'ar' ? space.status.label : space.status.value }}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between pt-4 bg-gray-50 p-6">
          <div class="text-lg leading-tight font-semibold text-gray-900">
            {{ `${space.hour_rate} ${$t('common.SAR')} / ${$t('hour')}` }}
          </div>
          <!-- status badge -->
          <div class="flex items-center gap-2">
            <CheckCircleIcon class="h-5 w-5 text-zaman" aria-hidden="true" />
            <p class="text-sm text-gray-400">
              {{ space.type.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>