<template>
    <section>
        <SearchBar v-model="movies.query" @submit="onSearch" />

        <div class="mt-6">
            <div v-if="movies.loading" class="flex items-center gap-2 text-bluegray-700">
                <Spinner /> <span>Loading...</span>
            </div>

            <StateMessage v-else-if="movies.error">{{ movies.error }}</StateMessage>

            <StateMessage v-else-if="!movies.hasResults && !movies.query">
                Try searching for a film title.
            </StateMessage>

            <StateMessage v-else-if="!movies.hasResults && movies.query">
                No results for "{{ movies.query }}"
            </StateMessage>

            <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <MovieCard
                    v-for="m in movies.results"
                    :key="m.imdbID"
                    :movie="m"
                    @click="$router.push({ name: 'movie', params: { id: m.imdbID } })"
                />
            </div>

            <div v-if="movies.totalPages > 1" class="mt-6 flex items-center gap-2">
                <button
                    class="cursor-pointer rounded-full border border-bluegray-200 bg-purple-50 text-purple-700 px-4 py-2 transition hover:bg-purple-700 hover:text-purple-50 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary-100"
                    :disabled="movies.page <= 1 || movies.loading"
                    @click="gotoPage(movies.page - 1)"
                >   
                    Prev
                </button>

                <span class="text-sm text-bluegray-600">
                    Page {{ movies.page }} / {{ movies.totalPages }}
                </span>

                <button
                    class="cursor-pointer rounded-full border border-bluegray-200 bg-purple-50 text-purple-700 px-4 py-2 transition hover:bg-purple-700 hover:text-purple-50 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary-100"
                    :disabled="movies.page >= movies.totalPages || movies.loading"
                    @click="gotoPage(movies.page + 1)"
                >   
                    Next
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import SearchBar from '@/components/SearchBar.vue';
import StateMessage from '@/components/StateMessage.vue';
import Spinner from '@/components/Spinner.vue';
import MovieCard from '@/components/MovieCard.vue';

const movies = useMoviesStore()
const { query } = storeToRefs(movies)

function onSearch(q) {
    const term = (q ?? query.value)?.trim()
    if (!term) return
    movies.search(term, 1)
}

function gotoPage(page) {
    movies.search(movies.query, page)
}
</script>