<template>
    <div id="pokemonDetails" :class="[appData.screenFocus.details ? 'focus' : 'unfocus']">
        <h1>Details: <span v-if="appData.getActivePokemon != undefined">{{appData.getActivePokemon.name}}</span></h1>
        <button id="unfocusButton" @click="appData.toggleDetails()">hide screen</button>

        <button v-if="isActiveInTeam()" @click="appData.removeFromTeam(appData.getActivePokemon)">remove from team</button>
        <button v-else @click="appData.addToTeam(appData.getActivePokemon)">team</button>
        
        <button v-if="isActiveInFavorite()" @click="appData.removeFavorite(appData.getActivePokemon)">unfavorite</button>
        <button v-else @click="appData.addFavorite(appData.getActivePokemon)">add to favorite</button>
    </div>
</template>

<script setup lang="ts">
import PokemonAPI from '@/services/PokemonAPI';
import { pokemonStore } from '@/stores/appData';
import { useRoute } from 'vue-router';
import { watch } from "vue";

const appData = pokemonStore();
const route = useRoute();

const  isActiveInTeam = () => {
    return appData.team.find(obj => {  
        return obj.id === appData.getActivePokemon.id
    });
}

const isActiveInFavorite = () => {
    return appData.favorites.find(obj => { 
        return obj.id === appData.getActivePokemon.id
    });
}

const fetchPokemonDetails = async (id: any) => {
    if (!isNaN(Number(id)) || Number(id) < 151) { /* Pokemon details gets focused if ID is valid. */
        id = Number(id);
        appData.screenFocus.details = true;
    }
    else{ id = 1 }/* Invalid ID will result in the first entry by default */
    appData.activeId = id;
    
    try {
        const response = await PokemonAPI.getPokemonDetails(id);
        console.log('Pokemon detail data retrieved.');
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
    min-height: 100%;
    width: 100%;
}

#unfocusButton{
    display: none;
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

    #unfocusButton{
        display: block;
    }
}
</style>