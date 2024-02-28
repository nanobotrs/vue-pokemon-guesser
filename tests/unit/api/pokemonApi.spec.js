import pokemonApi from '@/api/pokemonApi';
import { shallowMount } from '@vue/test-utils'

describe('pokemonApi', () => {

    test('axios debe estar con el api de pokemon', () => {
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
    });
    
});