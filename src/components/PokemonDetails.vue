<template>
    <div id="pokemonDetails" :class="[appData.screenFocus.details ? 'focus' : 'unfocus']">
        <h1>Details</h1>
        <button @click="appData.toggleDetails()">hide screen</button>
    </div>
</template>

<script setup lang="ts">
import { pokemonStore } from '@/stores/appData';
const appData = pokemonStore();
</script>
    
<style scoped>
#pokemonDetails{
    width: inherit;
    min-height: 100vh;
    width: 100%;
    background: yellow;
}

@media only screen and (max-width: 750px) {
    #pokemonDetails{
        z-index: 30;
        position: fixed;
        top: 0;
        left: -100%;
        transition: 0.5s;
    }
    #pokemonDetails.focus{
        left: 0;
    }
}
</style>