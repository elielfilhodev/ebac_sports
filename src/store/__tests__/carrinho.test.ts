import reducer, { adicionar, limpar, remover } from '../reducers/carrinho'
import { Produto } from '../../types'

const camisa: Produto = {
  id: 1,
  nome: 'Camisa',
  preco: 100,
  imagem: 'camisa.png'
}
const bola: Produto = { id: 2, nome: 'Bola', preco: 50, imagem: 'bola.png' }

describe('carrinho reducer', () => {
  it('inicia vazio', () => {
    expect(reducer(undefined, { type: 'init' })).toEqual({ itens: [] })
  })

  it('adiciona um produto', () => {
    const estado = reducer(undefined, adicionar(camisa))
    expect(estado.itens).toHaveLength(1)
    expect(estado.itens[0].id).toBe(1)
  })

  it('não duplica o mesmo produto', () => {
    const estado = reducer(
      reducer(undefined, adicionar(camisa)),
      adicionar(camisa)
    )
    expect(estado.itens).toHaveLength(1)
  })

  it('remove pelo id', () => {
    const comDoisItens = reducer(
      reducer(undefined, adicionar(camisa)),
      adicionar(bola)
    )
    const estado = reducer(comDoisItens, remover(1))
    expect(estado.itens.map((i) => i.id)).toEqual([2])
  })

  it('limpa o carrinho', () => {
    const estado = reducer(reducer(undefined, adicionar(camisa)), limpar())
    expect(estado.itens).toEqual([])
  })

  it('não muta o estado anterior', () => {
    const anterior = reducer(undefined, { type: 'init' })
    reducer(anterior, adicionar(camisa))
    expect(anterior.itens).toHaveLength(0)
  })
})
