import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemons-mock";

describe("PokemonOptions component", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons,
            },
        });
    });

    test("debe hacer match con el snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe mostrar las 4 opciones correctamente', () => {
        const [p1, p2, p3, p4] = pokemons
        const liTags = wrapper.findAll('li')

        expect(liTags.length).toBe(4)
        expect(liTags[0].text()).toBe(p1.name)
        expect(liTags[1].text()).toBe(p2.name)
        expect(liTags[2].text()).toBe(p3.name)
        expect(liTags[3].text()).toBe(p4.name)
    });

    test('debe de emitir "selection" con sus parametros al hacer click en ', () => {
        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')

        console.log(wrapper.emitted('selection'))

        expect(wrapper.emitted('selection').length).toBe(4)
        expect(wrapper.emitted('selection')[0]).toEqual([1])
        expect(wrapper.emitted('selection')[1]).toEqual([2])
        expect(wrapper.emitted('selection')[2]).toEqual([3])
        expect(wrapper.emitted('selection')[3]).toEqual([4])
        
    });
});
