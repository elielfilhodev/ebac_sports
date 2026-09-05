import {
  selectQuantidadeNoCarrinho,
  selectValorTotalDoCarrinho,
  selectIdsDosFavoritos
} from '../selectors'
import type { RootState } from '..'

const estado = {
  carrinho: {
    itens: [
      { id: 1, nome: 'Camisa', preco: 100.5, imagem: 'a.png' },
      { id: 2, nome: 'Bola', preco: 49.5, imagem: 'b.png' }
    ]
  },
  favoritos: {
    itens: [{ id: 2, nome: 'Bola', preco: 49.5, imagem: 'b.png' }]
  }
} as RootState

describe('selectors', () => {
  it('calcula a quantidade de itens', () => {
    expect(selectQuantidadeNoCarrinho(estado)).toBe(2)
  })

  it('soma o valor total', () => {
    expect(selectValorTotalDoCarrinho(estado)).toBe(150)
  })

  it('devolve os ids dos favoritos', () => {
    expect(selectIdsDosFavoritos(estado).has(2)).toBe(true)
    expect(selectIdsDosFavoritos(estado).has(1)).toBe(false)
  })
})
