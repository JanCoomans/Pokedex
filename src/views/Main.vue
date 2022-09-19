<template>
  <main id="mainContainer">
      <div id="pokedexContainer">
        <section id="pokedexBaseContainer" class="d-flex justify-content-center" >
          <Pokédex />
        </section>
        <section id="teamContainer" class="gradient-purple" :class="[appData.getPokedexFocus == 'team' ? 'focus' : 'unfocus']" @scroll.passive="scrolling">
          <ListOverlay :pokemonList="appData.team" :title="'Mijn team'" :bgColorClass="'gradient-purple'" />
        </section>
        <section id="favoritesContainer" class="gradient-green" :class="[appData.getPokedexFocus == 'favorites' ? 'focus' : 'unfocus']" @scroll.passive="scrolling">
          <ListOverlay :pokemonList="appData.favorites" :title="'Favorieten'" />
        </section>
      </div>
      <section id="pokemonDetailsContainer" :class="`gradient-${appData.getActivePokemon.types[0].type.name}`" @scroll.passive="scrolling">
        <PokemonDetails />
      </section>
  </main>
</template>

<script setup lang="ts">
import Pokédex from "@/components/Pokédex.vue";
import ListOverlay from "@/components/ListOverlay.vue";
import PokemonDetails from "@/components/PokemonDetails.vue";
import { pokemonStore } from '@/stores/appData';
const appData = pokemonStore();

//const name = () => {} //function
//const name = computed(() => {}) //computed

const scrolling = function (e: any) {
  let target = e.target.getElementsByClassName('header')[0];
  
  if (e.target.scrollTop == 0) {
    target.classList.add("bg-none");
  }
  else{
    target.classList.remove("bg-none");
  }
}

</script>

<style scoped>
#pokedexContainer{
    position: relative;
    width: 100%;
}

#pokedexBaseContainer{
    width: inherit;
    background: var(--lighter-gray);
}

/* Each screen scrolls seperatly - scrollbar becomes invisible */
#pokemonDetailsContainer, #teamContainer, #favoritesContainer, #pokedexBaseContainer{
  height: 100vh;
  overflow: auto;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

#pokemonDetailsContainer::-webkit-scrollbar, #teamContainer::-webkit-scrollbar, #favoritesContainer::-webkit-scrollbar, #pokedexBaseContainer::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

/*------ ListOverlay ------*/
#teamContainer, #favoritesContainer {
    z-index: 10;
    display: flex;
    justify-content: center;
    position: fixed;
    width: inherit;
    top: 0;
    left: -100%;
    transition:left 0.5s;
}

#teamContainer.focus, #favoritesContainer.focus {
    left: 0;
    z-index: 20;
}


/*------ Responsive ------*/
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