import { defineStore } from "pinia";
const API_BASE = 'https://www.omdbapi.com/';

function buildUrl(params = {}) {
    const key = import.meta.env.VITE_OMDB_API_KEY;
    if (!key) {
        console.warn('VITE_OMDB_API_KEY is missing. Create .env.local with your key.');
    }
    const url = new URL(API_BASE);
    url.searchParams.set('apikey', key || '');
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
            url.searchParams.set(k, String(v));
        }
    });
    return url.toString();
}

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        query: '',
        page: 1,
        totalResults: 0,
        results: [],
        loading: false,
        error: null,
        detailsCache: {},

    }),

    getters: {
        totalPages: (s) => (s.totalResults ? Math.ceil(s.totalResults / 10) : 0),
        hasResults: (s) => s.results && s.results.length > 0,
    },

    actions: {
        async search(title, page = 1) {
            if (!title) return
            this.loading = true
            this.error = null
            try {
                const url = buildUrl({ s: title, page })
                const res = await fetch(url)
                const json = await res.json()

                if (json.Response === 'False') {
                    this.results = []
                    this.totalResults = 0
                    this.query = title
                    this.page = page
                    this.error = json.Error || 'No results'
                } else {
                    this.results = json.Search || []
                    this.totalResults = Number(json.totalResults || 0)
                    this.query = title
                    this.page = page
                }
            } catch {
                this.error = 'Something went wrong. Please try again.'
            } finally {
                this.loading = false
            }
        },

        async getDetails(imdbID, plot = 'short') {
            if (!imdbID) throw new Error('Missing imdbID')

            if (this.detailsCache[imdbID]) return this.detailsCache[imdbID]

            const url = buildUrl({ i: imdbID, plot })
            const res = await fetch(url)
            const json = await res.json()
            if (json.Response === 'False') throw new Error(json.Error || 'Not found')

            this.detailsCache[imdbID] = json
            return json
        },
    },

    persist: {
        key: 'movie-explorer:movies',
        paths: ['query', 'page', 'totalResults', 'results'],
    }
})