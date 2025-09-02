<template>
    <form @submit.prevent="submit" class="flex flex-col gap-3 sm:flex-row">
        <div class="relative flex-1">
            <input
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                type="search"
                placeholder="Search movies by title"
                class="w-full rounded-full border border-bluegray-200 bg-white px-4 py-2.5 pr-10 text-[15px] placeholder:text-bluegray-400 shadow-soft focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                aria-label="Movie title"
            />
            <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-bluegray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
        </div>
        <button type="submit" class="rounded-full bg-primary-500 px-6 py-2.5 text-white shadow-soft cursor-pointer transition hover:shadow-lift hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200">
            Search
        </button>
    </form>
</template>

<script setup>
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue', 'submit'])
function submit(){ emit('submit', props.modelValue?.trim()) }
</script>