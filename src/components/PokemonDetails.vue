<template>
    <div id="pokemonDetails">
        <header class="header bg-none">
            <div class="header-content d-flex">
                <div class="col-3 p-0 cursor-pointer">
                    <span class="mobile-only d-flex cursor-pointer" @click="appData.toggleDetails()">
                        <i class="fa-solid fa-chevron-left shaveron"></i>
                        <h5>Terug</h5>
                    </span>
                </div>
                <div class="col-6 p-0 text-center sub-title text-capitalize">
                    <span id="pokemonSubTitle">{{appData.getActivePokemon.name}}</span>
                    </div>
                <div class="col-3 p-0 text-right favoriteButton">
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
        <main id="detailsContainer" class="d-flex justify-content-center">
            <section id="detailBlockOne" class="detailBlock">
                <div class="title">
                    <h1 class="title-light text-capitalize">{{appData.getActivePokemon.name}}</h1>
                </div>
                <div id="lightbox">
                    <img v-if="appData['pokemonDetails']['sprites']" :src="appData['pokemonDetails']['sprites']['other']['official-artwork']['front_default']"
                        :alt="appData['getActivePokemon']['name']">
                </div>
                <div id="info" class="">
                    <h3 class="small-title">info</h3>
                    <div class="info-card shadow-soft">
                        <article class="text-regular">
                            {{appData.getFlavorText}}
                        </article>
                        <article>
                            <div class="info-entry">
                                <h5 class="muted">Type</h5>
                                <div v-for="entry in appData.getActivePokemon.types" :key="entry.slot"
                                    class="pokemon-type h-fit" :class="`type-${[entry.type.name]}`">
                                    {{entry.type.name}}
                                </div>
                            </div>
                            <div class="info-entry">
                                <h5 class="muted">Nummer</h5>
                                <h5 class="text-regular">{{numberFormater(appData.getActivePokemon.id)}}</h5>
                            </div>
                            <div class="info-entry">
                                <h5 class="muted">Hoogte</h5>
                                <h5 class="text-regular">{{appData.pokemonDetails.height / 10}}m</h5>
                            </div>
                            <div class="info-entry">
                                <h5 class="muted">Gewicht</h5>
                                <h5 class="text-regular">{{appData.pokemonDetails.weight / 10}}kg</h5>
                            </div>
                            <div class="info-entry">
                                <h5 class="muted">Categorie</h5>
                                <h5 class="text-regular">{{}}</h5>
                            </div>
                            <div class="info-entry">
                                <h5 class="muted">Geslacht</h5>
                                <h5 class="text-regular">{{}}</h5>
                            </div>
                            <div v-if="appData.pokemonDetails.abilities" class="info-entry">
                                <h5 class="muted">Vaardigheden</h5>
                                <h5 class="text-regular text-capitalize">{{appData.pokemonDetails.abilities[0].ability.name}}</h5>
                                <h5 class="text-regular text-capitalize" v-if="appData.pokemonDetails.abilities[1]">
                                    &#160;|&#160;{{appData.pokemonDetails.abilities[1].ability.name}}
                                </h5>
                                <!--<h5 v-for="(entry, index) in appData.pokemonDetails.abilities" :key="entry.slot"
                                    class="text-regular text-capitalize">
                                    {{entry.ability.name}}
                                    <span v-if="appData.pokemonDetails.abilities[index+1]">&#160;-&#160;</span>
                                </h5>-->
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section id="detailBlockTwo" class="detailBlock">
                <div class="title ipad-only">
                    <h1 class="title-light text-capitalize invisible">space</h1>
                </div>

                <div v-if="appData.getStats" id="statistics" class="spaced-top">
                    <h3 class="small-title">Statistieken</h3>
                    <div class="info-card shadow-soft">
                        <div v-for="entry in appData.getStats" :key="entry.id" class="info-entry">
                            <h5 class="muted text-capitalize">{{entry.name}}</h5>
                            <h5 class="text-regular">{{entry.value}}</h5>
                            <div class="stat-bar">
                                <div class="stat-filler" :class="entry.color"></div>
                            </div>
                        </div>
                        
                        <div class="info-entry">
                            <h5 class="muted text-capitalize">Total</h5>
                            <h5 class="text-regular">{{appData.getStatsTotal}}</h5>
                            <div class="stat-bar">
                                <div class="stat-filler high-stat w-100"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="moveset" class="spaced-top">
                    <h3 class="small-title">moveset</h3>
                    <div class="info-card shadow-soft"></div>
                </div>
                <div id="evolution" class="spaced-top">
                    <h3 class="small-title">evolutie</h3>
                    <template v-for="entry in appData.getEvolutionChain" :key="entry.name">
                        <PokemonCard :pokemon="entry" :muted="isActiveName(entry.name)"/>
                    </template>
                </div>
            </section>
        </main>
        <div id="bottomButton">
            <button v-if="isActiveInTeam()" @click="appData.removeFromTeam(appData.getActivePokemon)"
                class="btn-lg">Verwijderen uit mijn team</button>
            <button v-else @click="appData.addToTeam(appData.getActivePokemon)" class="btn-lg">
                Toevoegen aan mijn team
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import PokemonAPI from '@/services/PokemonAPI';
import PokemonCard from "@/components/PokemonCard.vue";
import { pokemonStore } from '@/stores/appData';
import { useRoute } from 'vue-router';
import { watch } from "vue";

const appData = pokemonStore();
const route = useRoute();

const isActiveName = (name: string) => {
    return appData.getActivePokemon.name === name
}


watch(
    () => appData.getStatWidth,
    () => {
        let statBars = document.getElementsByClassName('stat-filler');
        let statWidth = appData.getStatWidth;
        for (let index = 0; index < statWidth.length; index++) {
            statBars[index].style.width = `${statWidth[index]}%`;
        }
    }
)

const numberFormater = (number: number) => {
    switch (true) {
        case number < 10:
            return `00${number}`
        case number < 100:
            return `0${number}`
        default:
            return number
    }
}


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

    /* general stats */
    try {
        const response = await PokemonAPI.getPokemonDetails(id);
        console.log('Pokemon-detail data retrieved.');
        appData.pokemonDetails = response.data;
    }
    catch (error) {
        console.log(error);
    }

    /* Pokemon-species */
    try {
        const response = await PokemonAPI.getPokemonSpecies(id);
        console.log('Pokemon-species data retrieved.');
        appData.pokemonSpecies = response.data;
    }
    catch (error) {
        console.log(error);
    }

    /* Evolution-chain */
    try {
        const response = await PokemonAPI.getPokemonEvolutionChain(appData.pokemonSpecies['evolution_chain'].url);
        console.log('Pokemon evolution-chain data retrieved.');
        appData.pokemonEvolutionChain = response.data;
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
    width: 100%;
    min-height: 100%;
    width: 100%;
}

#bottomButton {
    position: sticky;
    bottom: 35px;
    width: 100%;
    text-align: center;

}

#pokemonSubTitle{
    transition: 0.5s;
}
.bg-none #pokemonSubTitle{
    opacity: 0;
}

.favoriteButton i {
    font-size: 19px;
}

.info-card {
    background: var(--white);
    border-radius: 10px;
    padding: 20px;
}

.spaced-top {
    margin-top: 25px;
}

.stat-bar{
    position: relative;
    flex-grow: 1;
    height: 4px;
    border-radius: 100px;
    background: var(--bg-stat-bar);
}

.stat-filler{
    height: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
}

/* MAIN BODY */
#detailsContainer {
    padding: 0 0 55px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.detailBlock {
    width: 375px;
    padding: 0 16px;
}

.detailBlock .small-title {
    margin-bottom: 10px;
}

#detailsContainer .title {
    margin: 0 0 0 0;
    width: 100%;
}

#detailsContainer .title h1 {
    margin: 0;
}


#lightbox {
    text-align: center;
    margin-bottom: 27px;
}

#lightbox img {
    width: 207px;
    height: auto;
}

#info article:first-of-type {
    margin-bottom: 20px;
}

#info .muted {
    width: 123px
}

#statistics .muted{
    width: 69px;
}

#statistics .text-regular{
    width: 35px;
}

.info-entry{
    display: flex;
    align-items: center;
}

.info-entry h5 {
    margin: 0;
}

.info-entry+.info-entry {
    margin: 15px 0 0 0;
}

@media only screen and (max-width: 750px) {}

@media screen and (min-width: 750px) {
    #pokemonDetails .header {
        width: calc(100% - var(--content-width));
    }
}

@media screen and (min-width: 1124px) {
    #pokemonDetails .header-content {
        max-width: 750px;
    }

    .spaced-top {
        margin-top: 20px;
    }

    #detailsContainer .title {
        margin-bottom: 24px;
        margin-left: -11px
    }

    #lightbox img {
        width: 269px;
    }
}

@media screen and (min-width: 1169px) {
    #detailsContainer {
        padding-right: 9px;
        padding-left: 35px;
    }
}
</style>