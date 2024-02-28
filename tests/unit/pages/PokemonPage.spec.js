import { mount, shallowMount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons-mock";

describe('PokemonPage Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    });

    test('debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('debe llamar mixPokemonArray al montar', () => {
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    });

    test('debe hacer match con el snapshot cuando cargan los pokemons', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    });

    test('debe mostrar los components de PokemonImage y PokemonOpcions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        })

        const pokemonImage = wrapper.find('pokemon-image-stub')
        const pokemonOptions = wrapper.find('pokemon-options-stub')

        expect(pokemonImage.exists()).toBeTruthy()
        expect(pokemonOptions.exists()).toBeTruthy()

        expect(pokemonImage.attributes('pokemonid')).toBe('1')
        expect(pokemonOptions.attributes('pokemons')).toBeTruthy()
    });

    test('debe ejecutarse checkAnswer', () => {
        const checkAnswerSpy = jest.spyOn(PokemonPage.methods, 'checkAnswer')
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        })
        
        const pokemonOptions = wrapper.find('pokemon-options-stub')
        pokemonOptions.trigger('selection')

        expect(checkAnswerSpy).toHaveBeenCalled()
    });

    test('pruebas con checkAnswer', async() => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        })
        
        await wrapper.vm.checkAnswer(1)

        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.vm.message).toBe('Felicitaciones')
        expect(wrapper.find('h2').text()).toBe('Felicitaciones')

        await wrapper.vm.checkAnswer(10)
        
        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)
    });
});