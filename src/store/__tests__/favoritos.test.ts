import reducer, { alternar } from '../reducers/favoritos'
import { Produto } from '../../types'

const camisa: Produto = {
  id: 1,
  nome: 'Camisa',
  preco: 100,
  imagem: 'camisa.png'
}

describe('favoritos reducer', () => {
  it('adiciona quando o produto não é favorito', () => {
    const estado = reducer(undefined, alternar(camisa))
    expect(estado.itens).toHaveLength(1)
  })

  it('remove quando o produto já é favorito', () => {
    const estado = reducer(
      reducer(undefined, alternar(camisa)),
      alternar(camisa)
    )
    expect(estado.itens).toHaveLength(0)
  })
})
