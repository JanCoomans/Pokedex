import API from './API.js'

export default {
    getPokemonList() {
        return API().get('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon')
    },
    getPokemonDetails(id) {
        return API().get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    },
    getPokemonSpecies(id) {
        return API().get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    },
    getPokemonEvolutionChain(url) {
        return API().get(url)
    },
}