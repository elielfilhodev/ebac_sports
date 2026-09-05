/**
 * Formatação de moeda extraída do componente `Produto`.
 *
 * Antes, o `Header` importava `paraReal` de dentro de `components/Produto`,
 * criando uma dependência entre dois componentes irmãos. Utilitário puro
 * pertence à camada de utilidades.
 */
export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )
