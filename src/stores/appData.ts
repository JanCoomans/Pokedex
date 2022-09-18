import { defineStore } from 'pinia';

export const pokemonStore = defineStore({
  id: 'appData',
  state: () => ({
    pokemonList: [],
    pokemonDetails: [],
    team: [],
    favorites: [],
    filter: "",
    sortOptions: {
      active: false,
      method: 'numerical',
      direction: false,
      selected: 4
    },
    screenFocus: {
      details: false,
      pokedex: 'default'
    },
    activeId: Number
  }),
  actions: {
    toggleSortScreen() {
      this.sortOptions.active = !this.sortOptions.active;
    },
    toggleSortDirection(){
      this.sortOptions.direction = !this.sortOptions.direction;
      this.resetSelected();
    },
    resetSelected(){
      switch(true) {
        case this.sortOneCondition:
          this.sortOptions.selected = 1;
          break;
        case this.sortTwoCondition:
          this.sortOptions.selected = 2;
          break;
        case this.sortThreeCondition:
          this.sortOptions.selected = 3;
          break;
        case this.sortFourCondition:
          this.sortOptions.selected = 4;
          break;
      }
    },
    applySortingMethod() {
      switch(this.sortOptions.selected) {
        case 1:   
          this.sortOptions.method = 'alphabetical';
          this.sortOptions.direction = true;
          break;
        case 2:
          this.sortOptions.method = 'alphabetical';
          this.sortOptions.direction = false;
          break;
        case 3:
          this.sortOptions.method = 'numerical';
          this.sortOptions.direction = true;
          break;
        case 4:
          this.sortOptions.method = 'numerical';
          this.sortOptions.direction = false;
          break;
      }
    },
    focusTeam() {
      console.log(`In focus: Team`);
      this.screenFocus.pokedex = 'team'
    },
    focusFavorites() {
      console.log(`In focus: Favorites`);
      this.screenFocus.pokedex = 'favorites'
    },
    unfocusPokedex() {
      console.log(`In focus: Pokedex`);
      this.screenFocus.pokedex = 'default'
    },
    toggleDetails() {
      this.screenFocus.details = !this.screenFocus.details
    },
    setDetails(id: string) {
      console.log(`Active pokemon id: ${id}`);
      this.toggleDetails();
    },
    addToTeam(pokemon: object){ 
      if (this.team.length < 6) {
        this.team.push(pokemon);
        console.log(`Pokemon ${pokemon.name} added to TEAM.`);
      }
      else {
        alert('Team is vol!\nEen team bevat maximaal 6 pokemon.');
        console.log('Error: team is full. A team has a max size of 6.');
      }
    },
    addFavorite(pokemon: object){
      this.favorites.push(pokemon);
      console.log(`Pokemon ${pokemon.name} added to FAVORITES.`);
    },
    removeFromTeam(pokemon: object){ 
      const index = this.team.findIndex(object => {
        return object.id === pokemon.id;
      });
      if (index > -1) {
        this.team.splice(index, 1);
        console.log(`Pokemon ${pokemon.name} removed from TEAM.`);
      }
      else console.log(`Error: Could not find ${pokemon.name} in TEAM.`);
    },
    removeFavorite(pokemon: object){
      const index = this.favorites.findIndex(object => {
        return object.id === pokemon.id;
      });
      if (index > -1) {
        this.favorites.splice(index, 1);
        console.log(`Pokemon ${pokemon.name} removed from FAVORITES.`);
      }
      else console.log(`Error: Could not find ${pokemon.name} in FAVORITES.`);
    }
  },
  getters:{ 
    sortOneCondition: (state) => {
      return state.sortOptions.method == 'alphabetical' && state.sortOptions.direction
    },
    sortTwoCondition: (state) => {
      return state.sortOptions.method  == 'alphabetical' && !state.sortOptions.direction
    },
    sortThreeCondition: (state) => {
      return state.sortOptions.method   == 'numerical'&& state.sortOptions.direction
    },
    sortFourCondition: (state) => {
      return state.sortOptions.method  == 'numerical' && !state.sortOptions.direction
    },
    getPokedexFocus: (state) => {
      return state.screenFocus.pokedex
    },
    getActivePokemon: (state) => {
      return state.pokemonList.find(p => p.id === state.activeId);
    },
  },
  persist: true
})


