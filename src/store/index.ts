import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from '../services/api'
import carrinhoReducer from './reducers/carrinho'
import favoritosReducer from './reducers/favoritos'

export const store = configureStore({
  reducer: {
    // Reducer gerado pelo RTK Query: cache, status das requisições e metadados.
    [api.reducerPath]: api.reducer,
    carrinho: carrinhoReducer,
    favoritos: favoritosReducer
  },
  // O middleware da api precisa ser concatenado (nunca substituir o default,
  // sob pena de perder serializableCheck / immutableCheck em desenvolvimento).
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

// Habilita refetch on focus / on reconnect.
setupListeners(store.dispatch)

// Tipos inferidos a partir do próprio store: não existe duplicação manual de
// tipagem, então qualquer slice novo aparece automaticamente em RootState.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
