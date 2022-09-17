<template>
  <main id="mainContainer">
      <div id="pokedexContainer">
        <Pokédex />
        <Team />
        <Favorites />
      </div>
      <div id="pokemonDetailsContainer">
        <PokemonDetails />
      </div>
  </main>
</template>

<script setup lang="ts">
import Pokédex from "@/components/Pokédex.vue";
import Team from "@/components/Team.vue";
import Favorites from "@/components/Favorites.vue";
import PokemonDetails from "@/components/PokemonDetails.vue";
import { pokemonStore } from '@/stores/appData';

const appData = pokemonStore();

//const name = () => {} //function
//const name = computed(() => {}) //computed
</script>

<style scoped>
#pokedexContainer{
    position: relative;
    width: 100%;
}

@media only screen and (min-width: 750px) {
  #pokedexContainer{
    width: 375px;
    max-width: 375px;
  }
  #mainContainer{
    display: flex;
  }
  #pokemonDetailsContainer{
    flex-grow: 1;
  }
}
</style>