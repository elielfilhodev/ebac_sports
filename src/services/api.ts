import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Produto } from '../types'

/**
 * Camada de acesso a dados via RTK Query.
 *
 * Por que RTK Query e não `useEffect` + `fetch`?
 * - cache normalizado por endpoint, deduplicação de requisições concorrentes e
 *   revalidação automática, sem código imperativo no componente;
 * - estados de `isLoading` / `isFetching` / `isError` derivados pelo próprio
 *   store, eliminando `useState` de controle espalhado pela UI;
 * - cancelamento automático no unmount (evita "setState on unmounted component"
 *   e vazamento de memória).
 */

// Centralizado e sem interpolação de input do usuário: a URL nunca é montada a
// partir de dados não confiáveis, o que remove a superfície de SSRF/URL
// injection no client. Em produção, mover para variável de ambiente
// (REACT_APP_API_URL) para não fixar o host no bundle.
const BASE_URL =
  process.env.REACT_APP_API_URL ?? 'https://api-ebac.vercel.app/api/'

/**
 * Guarda de tipo em runtime.
 *
 * TypeScript só valida em tempo de compilação: o payload que chega da rede é,
 * na prática, `any`. Validar a forma dos dados antes de colocá-los no store
 * evita que um contrato quebrado da API derrube a renderização e reduz o risco
 * de injeção de campos inesperados na árvore de estado.
 */
const ehProduto = (valor: unknown): valor is Produto => {
  if (typeof valor !== 'object' || valor === null) return false

  const candidato = valor as Record<string, unknown>

  return (
    typeof candidato.id === 'number' &&
    typeof candidato.nome === 'string' &&
    typeof candidato.preco === 'number' &&
    typeof candidato.imagem === 'string'
  )
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Produto'],
  // A lista de produtos é praticamente estática; 5 min de cache evita
  // requisições redundantes a cada remontagem do container.
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getProdutos: builder.query<Produto[], void>({
      query: () => 'ebac_sports',
      transformResponse: (resposta: unknown) =>
        Array.isArray(resposta) ? resposta.filter(ehProduto) : [],
      providesTags: ['Produto']
    })
  })
})

export const { useGetProdutosQuery } = api
