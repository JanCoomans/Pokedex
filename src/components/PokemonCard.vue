<template>
    <router-link class="pokemonCard" :to="`/${pokemon.id}`">
    <!--@click="appData.setDetails(pokemon.id)"-->
        <section class="d-flex">
            <img :src="pokemon.sprites.front_default" alt="{{pokemon.name}}">
            <span>
                <h3 class="sub-title text-capitalize my-5px">{{pokemon.name}}</h3>
                <h5 class="muted m-0">Nr.
                    {{numberFormater(pokemon.id)}}
                </h5>
            </span>
        </section>

        <section class="d-flex align-items-center h-fit mt-5px">
            <div v-for="entry in pokemon.types" :key="entry.slot" class="pokemon-type" :class="[entry.type.name]">
                {{entry.type.name}}</div>
            <i class="fa-solid fa-chevron-right shavron"></i>
        </section>
    </router-link>
</template>

<script setup lang="ts">
import { pokemonStore } from '@/stores/appData';
const appData = pokemonStore();
defineProps<{
    pokemon: object
}>()

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
    max-width: 340px;
    padding: 10px 14px 10px 13px;
    background: var(--white);
    box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.04);
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

.pokemonCard .shavron {
    color: var(--color-pokemon-card-shavron);
    font-size: 11px;
    margin-left: 15px;
}
</style>