<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { pokemonStore } from '@/stores/appData';

  const appData = pokemonStore();
  
  
  
  //TODO: team , favourite, details content
  //Details dynamic bg color
</script>

<style scoped>
</style>

