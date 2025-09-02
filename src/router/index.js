import { createRouter, createWebHistory } from "vue-router"
import SearchView from '../pages/SearchView.vue'
const MovieDetailsView = () => import('../pages/MovieDetailsView.vue')

const routes = [
    { path: '/', name: 'search', component: SearchView },
    { path: '/movie/:id', name: 'movie', component: MovieDetailsView, props: true },
]

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),
})