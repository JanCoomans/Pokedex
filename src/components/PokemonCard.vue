<template>
    <router-link class="pokemonCard shadow-soft" :class="[muted ? 'bg-muted' : 'bg-white']" :to="needsNewDetails() ? `/${pokemon.id}` : ''" @click="appData.screenFocus.details = true">
        <section class="d-flex">
            <img :src="pokemon.sprites.front_default" alt="{{pokemon.name}}">
            <span>
                <h3 class="sub-title color-black text-capitalize my-5px">{{pokemon.name}}</h3>
                <h5 class="muted m-0">Nr.
                    {{numberFormater(pokemon.id)}}
                </h5>
            </span>
        </section>

        <section class="d-flex align-items-center h-fit mt-5px">
            <div v-for="entry in pokemon.types" :key="entry.slot" class="pokemon-type" :class="`type-${[entry.type.name]}`">
                {{entry.type.name}}</div>
            <i class="fa-solid fa-chevron-right shevron"></i>
        </section>
    </router-link>
</template>

<script setup lang="ts">
import { pokemonStore } from '@/stores/appData';
//import { useRoute } from 'vue-router';
//import router from '@/router';
//const route = useRoute();

const appData = pokemonStore();
defineProps<{
    pokemon: object,
    muted?: Boolean
}>()


function needsNewDetails(id: number){
    if (appData.activeId == id) {
        return false
    }
    return true
}


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

const getPokemonById = (number: number) => {
    let selectedPokemon = appData.pokemonList.find(p => p['id'] === number);
    return selectedPokemon['name'];
}
</script>

<style scoped>
.pokemonCard {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 343px;
    padding: 10px 14px 10px 13px;
    background: var(--white);
    border-radius: 10px;
    text-decoration: none;
}

.pokemonCard+.pokemonCard {
    margin-top: 10px;
}

.pokemonCard img {
    height: 50px;
    width: auto;
    margin-right: 16px;
}

.pokemonCard .shevron {
    color: var(--color-pokemon-card-shevron);
    font-size: 11px;
    margin-left: 15px;
}
</style>
