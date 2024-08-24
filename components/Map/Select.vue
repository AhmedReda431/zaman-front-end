<script setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
    selected: {
        type: Object,
        required: false,
    },
    disableSelect: {
        type: Boolean,
        required: false,
        default: false
    }

});

const emit = defineEmits(['location-selected']);
const gmap = ref(null);
const center = reactive({ lat: 24.0, lng: 45.0 });
const mapOptions = reactive({
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
});

const selectedPosition = ref(null);

const onMapClick = (event) => {
    if (props.disableSelect) {
        return;
    }
    const latLng = event.latLng;
    const position = {
        lat: latLng.lat(),
        lng: latLng.lng(),
    };
    gmap.value.panTo(position);
    selectedPosition.value = position;
    emit('location-selected', position);
};
watch(() => props.selected,
    (newValue, oldValue) => {
        if (props.disableSelect) {
            center.lat = props.selected.lat;
            center.lng = props.selected.lng;
            selectedPosition.value = props.selected;
        }
    },
    { deep: true }
)
onMounted(() => {
    if (props.selected) {
        center.lat = props.selected.lat;
        center.lng = props.selected.lng;
        selectedPosition.value = props.selected;
    }
});
</script>

<template>
    <GMapMap ref="gmap" :center="center" :zoom="10" :options="mapOptions" style="width: 100%; height: 100%"
        @click="onMapClick">
        <transition name="marker-transition">
            <GMapMarker v-if="selectedPosition" :position="selectedPosition" key="marker">
            </GMapMarker>
        </transition>
    </GMapMap>
</template>

<style scoped>
.marker-transition-enter-active,
.marker-transition-leave-active {
    transition: all 0.5s ease;
}

.marker-transition-enter,
.marker-transition-leave-to {
    opacity: 0;
}
</style>
