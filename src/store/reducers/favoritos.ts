import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from '../../types'

type FavoritosState = {
  itens: Produto[]
}

const initialState: FavoritosState = {
  itens: []
}

/**
 * Slice de favoritos.
 *
 * Mantido separado do carrinho por coesão: são domínios distintos, com ciclos
 * de vida distintos. Um slice único "loja" acoplaria mudanças de favoritos a
 * re-renderizações de quem só observa o carrinho.
 */
const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    /** Alterna o produto: adiciona se não existe, remove se já existe. */
    alternar: (state, action: PayloadAction<Produto>) => {
      const indice = state.itens.findIndex(
        (item) => item.id === action.payload.id
      )

      if (indice >= 0) {
        state.itens.splice(indice, 1)
      } else {
        state.itens.push(action.payload)
      }
    }
  }
})

export const { alternar } = favoritosSlice.actions
export default favoritosSlice.reducer
