<template>
    <div id="pokemonDetails" :class="[appData.screenFocus.details ? 'focus' : 'unfocus']">
        <h1>Details: <span v-if="appData.getActivePokemon != undefined">{{appData.getActivePokemon.name}}</span></h1>
        <button @click="appData.toggleDetails()">hide screen</button>
    </div>
</template>

<script setup lang="ts">
import PokemonAPI from '@/services/PokemonAPI';
import { pokemonStore } from '@/stores/appData';
import { useRoute } from 'vue-router';
import { watch } from "vue";

const appData = pokemonStore();
const route = useRoute();

const fetchPokemonDetails = async (id: any) => {
    if (!isNaN(Number(id)) || Number(id) < 151) { /* Pokemon details gets focused if ID is valid. */
        id = Number(id);
        appData.screenFocus.details = true;
    }
    else{ id = 1 }/* Invalid ID will result in the first entry by default */
    appData.activeId = id;
    
    try {
        const response = await PokemonAPI.getPokemonDetails(id);
        console.log('Pokemon details retrieved.');
        appData.pokemonDetails = response.data;
    }
    catch (error) {
        console.log(error);
    }
}

/* Fetch new pokemon stats on parameter.id change. */
fetchPokemonDetails(route['params']['id']);
watch(
    () => route['params']['id'],
    () => { 
        if (appData.activeId.toString() != route['params']['id']) {
            fetchPokemonDetails(route['params']['id']);
        }
    }
)
</script>
    
<style scoped>
#pokemonDetails {
    width: inherit;
    min-height: 100vh;
    width: 100%;
    background: yellow;
}

@media only screen and (max-width: 750px) {
    #pokemonDetails {
        z-index: 30;
        position: fixed;
        top: 0;
        left: -100%;
        transition: 0.5s;
    }

    #pokemonDetails.focus {
        left: 0;
    }
}
</style>