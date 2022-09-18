<template>
    <section id="pokedexBase" class="d-flex justify-content-center">
        <SortOverlay />
        
        <div id="pokedex">
            <div id="sortIcons">
                <i class="fa-solid fa-filter cursor-pointer" @click="appData.toggleSortScreen()"></i>
                <i class="fa-solid fa-arrow-right-arrow-left rotate-90 cursor-pointer" @click="appData.toggleSortDirection()"></i>
            </div>
            <h1 class="title-dark">Pokédex</h1>
            <input id="searchFilter" v-model="appData.filter" placeholder="&#xF002; Pokemon zoeken" type="text">
            <div id="buttonCards" class="d-flex justify-content-between">
                <div id="teamCard" class="button-card" @click="appData.focusTeam()">
                    <h3>Mijn team</h3>
                    <h5>{{appData.team.length}} pokemons</h5>
                </div>
                <div id="favoritesCard" class="button-card" @click="appData.focusFavorites()">
                    <h3>Favorieten</h3>
                    <h5>{{appData.favorites.length}} pokemons</h5>
                </div>
            </div>
            <div class="justify-content-center w-100">
                <template v-for="entry in getSortedList()" :key="entry.id">
                    <PokemonCard v-if="applyFilter(entry.name)" :pokemon="entry" />
                </template>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import SortOverlay from "@/components/SortOverlay.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import PokemonAPI from '@/services/PokemonAPI'
import { pokemonStore } from '@/stores/appData';

const appData = pokemonStore();

const loadPokemonListData = async () => {
    try{
        const response = await PokemonAPI.getPokemonList();
        console.log('Succesfully retrieved pokemon data.');
            
        appData.pokemonList = response.data;
    }
      catch(error){
        console.log(error);
    }
}
if (!appData.pokemonList.length || !localStorage.getItem(localStorage.key('pokemonList')).length) {
    /* Fetch pokemon data if Pinia and/or Localstorage is empty */
    loadPokemonListData()
}
else{
    console.log('Local save data retrieved.');
}

const applyFilter = (name: string) => {
    return new RegExp(`^${appData.filter}`).test(name);;
}

const getSortedList = () => {
    let list = appData.pokemonList;
    switch(true) {
        case appData.sortOneCondition:
            return list.sort((a: { name: String; }, b: { name: String; }) => {
                let pa = a['name'].toLowerCase(),
                    pb = b['name'].toLowerCase();
                    
                if (pa < pb) {
                    return 1;
                }
                if (pa > pb) {
                    return -1;
                }
                return 0;
            });
          break;
        case appData.sortTwoCondition:
            return list.sort((a: { name: String; }, b: { name: String; })=> {
                let pa = a['name'].toLowerCase(),
                    pb = b['name'].toLowerCase();

                if (pa < pb) {
                    return -1;
                }
                if (pa > pb) {
                    return 1;
                }
                return 0;
            });
          break;
        case appData.sortThreeCondition:
          return list.sort((a: { id: number; }, b: { id: number; }) => {
            return b.id - a.id;
          });
          break;
        case appData.sortFourCondition:
            return list.sort((a: { id: number; }, b: { id: number; }) => {
                return a.id - b.id;
            });
        break;
        default:
            return list;
    }
}
</script>
    
<style scoped>
/*------ POKEDEX ------*/
/* General */
#pokedexBase{
    width: inherit;
    min-height: 100vh;
    background: var(--lighter-gray);
}

#pokedex{
    width: 100%;
    max-width: 375px;
    padding: 51px 16px;
    z-index: 0;
}

/* Spacing */
.title-dark{
    margin-bottom: 14px;
}

#sortIcons, #searchFilter{
    margin-bottom: 19px;
}

#buttonCards{
    margin-bottom: 20px;
}

/* filter icons */
#sortIcons {
    text-align: right;
}

#sortIcons i{
    font-size: 18px;
}

#sortIcons i:not(:last-of-type){
    padding-right: 10px;
}

.rotate-90{
    transform: rotate(90deg);
}

/* Searchbar */
#searchFilter{
    width: 100%;
    height: 36px;
    padding: 8px 7px;
    border-radius: 10px;
    border: none;
    background: var(--bg-searchbar);
    font-family:Arial, FontAwesome;
}

/* button-cards */
.button-card{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: calc((100% - 9px) * 0.5);
    height: 100px;
    border-radius: 10px;
    padding: 10px 15px;
}

.button-card h3{
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: var(--white);
    margin: 0 0 3px 0;
}

#buttonCards h5{
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
}

#teamCard{
    background: var(--gradient-purple);
}

#favoritesCard{
    background: var(--gradient-green);
}

</style>
    