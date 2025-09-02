import { mount } from "@vue/test-utils";
import MovieCard from '@/components/MovieCard.vue'
import { describe, expect } from "vitest";

describe('MovieCard', () => {
    it('renders title', () => {
        const wrapper = mount(MovieCard, {
            props: { movie: { Title: 'Inception', Year: '2010', Poster: 'N/A', imdbID: 'tt1375666' } }
        })
        expect(wrapper.text()).toContain('Inception')
    })

    it('uses placeholder when Poster is N/A', async () => {
        const movie = { Title: 'No Poster', Year: '2020', Poster: 'N/A', imdbID: 'tt0000001' }
        const wrapper = mount(MovieCard, { props: { movie } })
        const img = wrapper.get('img')
        expect(img.attributes('src')).toMatch(/placehold\.co/)
    })
})