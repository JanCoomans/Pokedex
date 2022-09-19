<template>
    <div class="overlayBlock">
        <header class="header sticky-top bg-none">
            <div @click="appData.unfocusPokedex()" class="cursor-pointer d-flex">
                <i class="fa-solid fa-chevron-left shaveron"></i> <h5>Terug</h5>
            </div>
        </header>
        <div>
            <h1 class="title-light">{{title}}</h1>
            <div class="d-flex flex-wrap justify-content-center w-100">
                <template v-for="entry in pokemonList" :key="entry.name">
                    <PokemonCard :pokemon="entry" />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { pokemonStore } from '@/stores/appData';
    import PokemonCard from "@/components/PokemonCard.vue";
    
    const appData = pokemonStore();
    defineProps<{
        pokemonList: object,
        title: String
    }>()

</script>
    
<style scoped>

.overlayBlock {
    position: relative;
    width: 100%;
    max-width: 375px;
    padding: 0 16px;
}

.overlayBlock .title-light {
    margin: 11px 0 25px 0;
}
</style>