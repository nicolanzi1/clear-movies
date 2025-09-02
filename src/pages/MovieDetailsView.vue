<template>
    <section>
        <router-link to="/" class="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                </path>
            </svg>
            Back
        </router-link>

        <div v-if="loading" class="mt-4">
            <Spinner /> <span class="ml-2 text-bluegray-700">Loading...</span>
        </div>

        <StateMessage v-else-if="error">{{ error }}</StateMessage>

        <article v-else class="grid gap-6 md:grid-cols-[200px,1fr]">
            <img
                :src="posterUrl"
                class="w-[200px] rounded-xl border border-bluegray-100 bg-bluegray-50"
                :alt="movie.Title"
                @error="onImgError"
            />
            <div>
                <h2 class="text-xl font-semibold text-bluegray-900">
                    {{ movie.Title }} <span class="text-bluegray-500">({{ movie.Year }})</span>
                </h2>
                <p class="mt-1 inline-flex rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-700">{{ movie.Genre }}</p>
                <p class="mt-4 leading-relaxed text-bluegray-800">{{ movie.Plot }}</p>
                <dl class="mt-4 grid gap-2 text-sm text-bluegray-700">
                    <div><dt class="inline font-medium text-bluegray-900">Cast:</dt> <dd class="inline">{{ movie.Actors }}</dd></div>
                    <div><dt class="inline font-medium text-bluegray-900">IMDb:</dt> <dd class="inline">{{ movie.imdbRating }}</dd></div>
                </dl>
            </div>
        </article>
    </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMoviesStore } from '@/stores/movies';
import Spinner from '@/components/Spinner.vue';
import StateMessage from '@/components/StateMessage.vue';

const route = useRoute()
const movies = useMoviesStore()

const movie = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
    try {
        movie.value = await movies.getDetails(route.params.id, 'full')
    } catch (e) {
        error.value = e?.message || 'Unable to load movie'
    } finally {
        loading.value = false
    }
})

const posterUrl = computed(() => {
    if (!movie.value) return ''
    const src = movie.value.Poster
    return !src || src === 'N/A' ? 'https://placehold.co/300x445?text=No+Poster' : src
})
function onImgError(e) {
    e.target.src = 'https://placehold.co/300x445?text=No+Poster'
}
</script>