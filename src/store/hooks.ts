import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '.'

/**
 * Hooks tipados.
 *
 * Encapsular `useDispatch` / `useSelector` aqui evita repetir a anotação de
 * tipo em cada componente e garante autocomplete no `state` e nas thunks.
 * A regra do time passa a ser: nunca importar `useSelector`/`useDispatch`
 * direto do react-redux nos componentes.
 */
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
