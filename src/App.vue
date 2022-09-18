<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { pokemonStore } from '@/stores/appData';

  const appData = pokemonStore();
  
  
  
  //TODO: team , favourite, details consent
  //Details dynamic bg color
  //Localstorage save state
</script>

<style scoped>
</style>

