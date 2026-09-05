/**
 * Contratos de domínio da aplicação.
 *
 * Ficam isolados em `types/` (e não dentro de `App.tsx`) para que a camada de
 * estado (store/services) não dependa da camada de UI. Isso quebra o
 * acoplamento circular "componente -> store -> componente" e permite testar
 * reducers sem carregar React.
 */
export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}
