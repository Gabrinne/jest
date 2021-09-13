import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'


describe('Um lance sem valor mínimo', () => {

    test('não aceita lance com valor menor do que 0', () => {
        const wrapper = mount(Lance) //Montando o componente
        const input = wrapper.find('input') //localizando o input
        input.setValue(-1000) //setando valor inválido
        expect(input).toBeTruthy() //verifica se o input existe

        const lancesEmitidos = wrapper.emitted('novo-lance') //ouvindo os eventos através do novo-lance
        wrapper.trigger('submit') //ativando a submissão do formulário
        expect(lancesEmitidos).toBeUndefined() //esperando que os lances emitidos sejam undefined
    })

    test('emite um lance quando o valor é maior que 0 ', () => {

        const wrapper = mount(Lance)
        const input = wrapper.find('input')
        input.setValue(1000)
        wrapper.trigger('submit')

        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)

    })


    test('emite o valor esperado de um lance válido', () => {

        const wrapper = mount(Lance)
        const input = wrapper.find('input')
        input.setValue(100)
        wrapper.trigger('submit')

        const lancesEmitidos = wrapper.emitted('novo-lance')

        const lance = parseInt(lancesEmitidos[0][0])
        expect(lance).toBe(100)


    })
})

describe('Um lance com valor mínimo', () => {

    test('todos os lances devem possuir um valor maior do que o minimo informado', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(309)
        wrapper.trigger('submit')

        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)

    })



    test('emite o valor esperado de um lance valido', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(400)
        wrapper.trigger('submit')

        const lancesEmitidos = wrapper.emitted('novo-lance')
        const valorDoLance = parseInt(lancesEmitidos[0][0])
        expect(valorDoLance).toBe(400)
    })

    test('Não são aceitos lances com valores menores do que o mínimo informado', async () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(100)
        wrapper.trigger('submit')

        await wrapper.vm.$nextTick()

        const msgErro = wrapper.find('p.alert').element.textContent
        const msgEsperada =   'O valor mínimo para o lance é de R$ 300'
        expect(msgErro).toContain(msgEsperada)
    })




})

