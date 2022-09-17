<template>
  <RouterView />
</template>

<script lang="ts">
  import PokemonAPI from '@/services/PokemonAPI'
  import { pokemonStore } from '@/stores/appData';
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';

  const appData = pokemonStore();
  const route = useRoute();
  
  //console.log(route['params']['id'].toString());
onMounted(() => {
  console.log('mounted');
  
    console.log(route['params']['id']);
  })

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
  
</script>

<style scoped>
</style>

