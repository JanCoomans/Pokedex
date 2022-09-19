<template>
    <div id="pokemonDetails">
        <header class="header sticky-top bg-none">
            <div class="header-content-full d-flex">
                <div @click="appData.toggleDetails()" class="cursor-pointer col-2 p-0">
                    <span class="mobile-only d-flex">
                        <i class="fa-solid fa-chevron-left shaveron"></i>
                        <h5>Terug</h5>
                    </span>
                </div>
                <div class="col-8 p-0 text-center sub-title text-capitalize"><span class="mobile-only">{{appData.getActivePokemon.name}}</span></div>
                <div class="col-2 p-0 text-right favoriteButton">
                    <div v-if="isActiveInFavorite()" @click="appData.removeFavorite(appData.getActivePokemon)"
                        class="cursor-pointer">
                        <i class="fa-solid fa-heart"></i><!-- Favorited (solid hearth) -->
                    </div>
                    <div v-else @click="appData.addFavorite(appData.getActivePokemon)" class="cursor-pointer">
                        <i class="fa-regular fa-heart color-white"></i><!-- Not favorited (hollow hearth) -->
                    </div>
                </div>
            </div>
        </header>
        <div class="header-filler"></div>
        <main class="content-block">
            <div class="list-content">
                <h1 class="title-light">{{appData.getActivePokemon.name}}</h1>
                <div class="d-flex flex-wrap justify-content-center w-100">
                </div>
            </div>
        </main>
        <div id="bottomButton">
            <button v-if="isActiveInTeam()" @click="appData.removeFromTeam(appData.getActivePokemon)"
                class="btn-lg">Verwijderen uit mijn team</button>
            <button v-else @click="appData.addToTeam(appData.getActivePokemon)" class="btn-lg">Toevoegen aan mijn
                team</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import PokemonAPI from '@/services/PokemonAPI';
import { pokemonStore } from '@/stores/appData';
import { useRoute } from 'vue-router';
import { watch } from "vue";

const appData = pokemonStore();
const route = useRoute();

const isActiveInTeam = () => {
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
    else { id = 1 }/* Invalid ID will result in the first entry by default */
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
    position: relative;
    width: inherit;
    min-height: 100%;
    width: 100%;
}



#bottomButton {
    position: absolute;
    bottom: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
}

.favoriteButton i {
    font-size: 19px;
}
</style>