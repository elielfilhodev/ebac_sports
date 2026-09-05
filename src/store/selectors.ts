import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '.'

/**
 * Selectors centralizados.
 *
 * Os componentes nunca "cavam" o formato do estado (`state.carrinho.itens`).
 * Toda leitura passa por aqui, então refatorar a árvore de estado não quebra a
 * UI. Os derivados usam `createSelector` (memoização por referência) para não
 * recalcular nem gerar novos objetos a cada render — o que causaria
 * re-render em loop no `useSelector`.
 */
export const selectItensDoCarrinho = (state: RootState) => state.carrinho.itens
export const selectFavoritos = (state: RootState) => state.favoritos.itens

export const selectQuantidadeNoCarrinho = createSelector(
  selectItensDoCarrinho,
  (itens) => itens.length
)

export const selectQuantidadeDeFavoritos = createSelector(
  selectFavoritos,
  (itens) => itens.length
)

export const selectValorTotalDoCarrinho = createSelector(
  selectItensDoCarrinho,
  (itens) => itens.reduce((total, item) => total + item.preco, 0)
)

/** Sets para lookup O(1) em listas grandes, em vez de `find` a cada card. */
export const selectIdsDoCarrinho = createSelector(
  selectItensDoCarrinho,
  (itens) => new Set(itens.map((item) => item.id))
)

export const selectIdsDosFavoritos = createSelector(
  selectFavoritos,
  (itens) => new Set(itens.map((item) => item.id))
)
