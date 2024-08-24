<script setup>

const { locale } = useI18n()

defineProps({
    slides: {
        type: [Object, Array],
        required: true
    },
    slidesPerView: {
        type: [Number, String],
        default: 1
    },
    effect: {
        type: String,
        default: 'fade'
    },
    swiperClass: {
        type: String,
        required: false,
        default: 'rounded aspect-video'
    },
    swiperNavigation: {
        type: Boolean,
        required: false,
        default: false
    }
})


</script>

<template>
    <Swiper :class="swiperClass" dir="ltr" :modules="[
        SwiperAutoplay,
        SwiperEffectCreative,
        SwiperEffectFade,
        SwiperPagination,
        SwiperNavigation
    ]" 
    :navigation="swiperNavigation"
    pagination :slides-per-view="slidesPerView" :loop="true" :effect="effect" :creative-effect="{
    prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
    },
    next: {
        translate: ['100%', 0, 0],
    },
}" :autoplay="{
    delay: 6000,
}">
        <SwiperSlide v-for="slide in slides" :key="slide">
            <slot name="slide" :slide="slide">
                <img :src="slide.image" :alt="slide.name"  class="h-full w-full">
                <strong  class="absolute text-white bottom-8 left-3 rounded-[0.5rem] px-4 py-2 bg-zaman-dark">
                    {{ locale == 'ar' ? slide.name_ar : slide.name }}
                </strong>
            </slot>

        </SwiperSlide>
    </Swiper>
</template>
