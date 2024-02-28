import { shallowMount } from "@vue/test-utils";
import PokemonImage from "@/components/PokemonImage"

describe('PokemonImage component', () => {

    test('debe hacer match con el snapshot', () => {
        const wrapper = shallowMount(PokemonImage, {
            props: {
                pokemonId: 1,
                showPokemon: false
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('debe mostrar la imagen oculta y el pokemon 100', () => {
        const wrapper = shallowMount(PokemonImage, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        })

        const [img1, img2] = wrapper.findAll('img')
        const url = img1.attributes('src')

        expect(img1.exists()).toBeTruthy()
        expect(img2).toBe(undefined)
        expect(img1.classes('hidden-pokemon')).toBeTruthy()
        expect(url)
            .toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
    });

    test('debe mostrar el pokemon si el showPokemon: true', () => {
        const wrapper = shallowMount(PokemonImage, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })

        const [img1, img2] = wrapper.findAll('img')

        expect(img1.exists()).toBeTruthy()
        expect(img2).toBe(undefined)
        expect(img1.classes('fade-in')).toBeTruthy()
    });

});
