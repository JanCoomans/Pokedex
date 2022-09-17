<template>
    <div id="favoritesContainer" :class="[appData.getPokedexFocus == 'favorites' ? 'focus' : 'unfocus']">
        <h1>Favorites</h1>
        <button @click="appData.unfocusPokedex()">hide screen</button>
    </div>
</template>

<script setup lang="ts">
import { pokemonStore } from '@/stores/appData';
const appData = pokemonStore();
</script>
    
<style scoped>
#favoritesContainer{
    z-index: 10;
    position: fixed;
    width: inherit;
    min-height: 100vh;
    top: 0;
    left: -100%;
    background: var(--gradient-green);
    transition: 0.5s;
}

#favoritesContainer.focus{
    left: 0;
    z-index: 20;
}
</style>