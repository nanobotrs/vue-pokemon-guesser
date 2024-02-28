<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>Quién es este pokemon?</h1>
        <PokemonImage :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
        <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer($event)" />
        <template v-if="showAnswer" class="fade-in">
            <h2>{{ message }}</h2>
            <div class="center">
                <button @click="newGame" class="btn">Nuevo juego</button>
            </div>
        </template>
    </div>
</template>

<script>
import PokemonImage from "../components/PokemonImage.vue";
import PokemonOptions from "../components/PokemonOptions.vue";
import getPokemonOptions from '@/helpers/getPokemonOp'

export default {
    components: {
        PokemonImage,
        PokemonOptions
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()

            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(pokemonId) {
            this.showPokemon = true
            this.message = this.pokemon.id === pokemonId ? 'Felicitaciones' : `Oops, era ${this.pokemon.name}`
            this.showAnswer = true
        },
        newGame() {
            this.pokemonArr = []
            this.pokemon = null
            this.showPokemon = false
            this.showAnswer = false
            this.message = ''
            this.mixPokemonArray()
        }
    },
    mounted() {
        this.mixPokemonArray()
    },
}
</script>