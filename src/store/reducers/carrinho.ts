import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from '../../types'

type CarrinhoState = {
  itens: Produto[]
}

const initialState: CarrinhoState = {
  itens: []
}

/**
 * Slice do carrinho.
 *
 * Regra de ouro: reducers são funções PURAS. Nenhum `alert`, `fetch`, `Date.now()`
 * ou acesso a `window` aqui dentro — efeitos colaterais quebram time-travel
 * debugging, testes determinísticos e replay de ações.
 *
 * A mutação aparente (`state.itens.push`) é segura porque o Immer, embutido no
 * Redux Toolkit, intercepta as escritas em um draft e produz um novo estado
 * imutável. O código fica legível sem abrir mão da imutabilidade.
 */
const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    /** Idempotente: adicionar duas vezes o mesmo produto não duplica o item. */
    adicionar: (state, action: PayloadAction<Produto>) => {
      const jaEstaNoCarrinho = state.itens.some(
        (item) => item.id === action.payload.id
      )

      if (!jaEstaNoCarrinho) {
        state.itens.push(action.payload)
      }
    },
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((item) => item.id !== action.payload)
    },
    limpar: (state) => {
      state.itens = []
    }
  }
})

export const { adicionar, remover, limpar } = carrinhoSlice.actions
export default carrinhoSlice.reducer
