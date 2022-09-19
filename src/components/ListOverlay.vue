<template>
    
    <div class="overlayBlock">
        <header class="header bg-none">
            <div @click="appData.unfocusPokedex()" class="cursor-pointer d-flex header-content">
                <i class="fa-solid fa-chevron-left shaveron"></i> <h5>Terug</h5>
            </div>
        </header>
        <div class="header-filler"></div>
        <div class="content-block">
            <div class="list-content">
                <h1 class="title-light">{{title}}</h1>
                <div class="d-flex flex-wrap justify-content-center w-100">
                    <template v-for="entry in pokemonList" :key="entry.name">
                        <PokemonCard :pokemon="entry" />
                    </template>
                </div>
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
    width: 100%;
}

.overlayBlock .title-light {
    margin: 0 0 25px 0;
}
@media screen and (min-width: 750px) {
    .overlayBlock, .overlayBlock .header {
        width: var(--content-width);
    }
}

</style>