import { setActivePinia, createPinia } from "pinia";
import { useMoviesStore } from '@/stores/movies'
import { beforeEach } from "vitest";

describe('movies store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('getDetails returns cached movie without calling fetch again', async () => {
        const store = useMoviesStore()

        // 1) Seed cache
        store.detailsCache['tt123'] = { Title: 'Cached', imdbID: 'tt123' }

        // 2) Spy on fetch to ensure it is not called
        const spy = vi.spyOn(global, 'fetch')

        const result = await store.getDetails('tt123', 'short')
        expect(result.Title).toBe('Cached')
        expect(spy).not.toHaveBeenCalled()

        spy.mockRestore()
    })

    it('getDetails calls fetch when not cached', async () => {
        const store = useMoviesStore()

        // Minimal fetch mock
        const fake = { Title: 'Fresh', imdbID: 'tt999', Response: 'True' }
        const spy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => fake
        })

        const result = await store.getDetails('tt999', 'short')
        expect(result.Title).toBe('Fresh')
        expect(spy).toHaveBeenCalledTimes(1)
        spy.mockRestore()
    })
})