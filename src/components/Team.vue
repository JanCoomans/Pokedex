<template>
    <div id="teamContainer" :class="[appData.getPokedexFocus == 'team' ? 'focus' : 'unfocus']">
        <h1>Team</h1>
        <button @click="appData.unfocusPokedex()">hide screen</button>
        <div class="d-flex flex-wrap justify-content-center w-100">
            <template v-for="entry in appData.team" :key="entry.name">
                <PokemonCard :pokemon="entry" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import PokemonCard from "@/components/PokemonCard.vue";
import { pokemonStore } from '@/stores/appData';
const appData = pokemonStore();
</script>
    
<style scoped>
#teamContainer{
    z-index: 10;
    position: fixed;
    width: inherit;
    min-height: 100vh;
    top: 0;
    left: -100%;
    background: var(--gradient-purple);
    transition: 0.5s;
}

#teamContainer.focus{
    left: 0;
    z-index: 20;
}
</style>