<template>
    <article 
        class="cursor-pointer rounded-xl border border-bluegray-100 bg-white p-3 shadow-soft transition hover:shadow-lift hover:-translate-y-0.5"
        @click="$emit('click')"
    >
        <img
            :src="posterUrl"
            :alt="movie.Title"
            class="mb-3 aspect-[2/3] w-full rounded-lg border border-bluegray-100 bg-bluegray-50 object-cover"
            @error="onImgError"
        >
        <h3 class="line-clamp-1 font-semibold text-bluegray-900">{{ movie.Title }}</h3>
        <p class="text-sm text-bluegray-500">{{ movie.Year }}</p>
    </article>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ movie: { type: Object, required: true } })

const posterUrl = computed(() => {
    const src = props.movie.Poster
    return !src || src === 'N/A' ? 'https://placehold.co/300x445?text=No+Poster' : src
})
function onImgError(e) {
    e.target.src = 'https://placehold.co/300x445?text=No+Poster'
}
</script>