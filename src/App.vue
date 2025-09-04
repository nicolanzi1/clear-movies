<template>
  <div class="min-h-screen bg-bluegray-50 text-bluegray-900">
    <!-- Top bar (brand) -->
    <div class="bg-primary-500">
      <header class="mx-auto max-w-6xl px-4 py-6 text-white">
        <router-link to="/" @click="resetSearch" class="inline-flex items-center gap-2">
          <h1 class="text-4xl font-semibold tracking-tight">Clear <span class="text-black">Movies</span></h1>
        </router-link>
        <p class="mt-1 text-sm/relaxed text-white/85">Find films fast. Clean, simple and installabale.</p>
      </header>
    </div>
    
    <!-- Card container -->
    <main class="mx-auto max-w-6xl px-4 mt-6 pb-12">
      <div class="rounded-2xl border border-purple-100 bg-white p-6 shadow-soft">
        <router-view />
      </div>
    </main>
    
    <footer class="mx-auto max-w-6xl text-center px-4 pb-10 text-white flex justify-center">
      <p class="w-sm bg-primary-900 border rounded-full py-4 text-xs md:text-sm">
        Built with Vue 3, Pinia, Tailwind, Vite + PWA
      </p>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
