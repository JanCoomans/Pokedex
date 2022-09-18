<template>
  <RouterView />
</template>

<script setup lang="ts">
  import PokemonAPI from '@/services/PokemonAPI'
  import { pokemonStore } from '@/stores/appData';

  const appData = pokemonStore();
  
  const loadPokemonListData = async () => {
      try{
        const response = await PokemonAPI.getPokemonList();
        console.log('pokemon list retrieved.');
            
        appData.pokemonList = response.data;
      }
      catch(error){
        console.log(error);
      }
  }
  if (appData.pokemonList = []) {
    loadPokemonListData()
  }
  
  //TODO: team , favourite, details consent
  //Details dynamic bg color
  //Localstorage save state
</script>

<style scoped>
</style>

