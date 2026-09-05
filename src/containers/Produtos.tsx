import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'

import * as S from './styles'

/**
 * Container de lista.
 *
 * Todo o ciclo de vida da requisição (loading, erro, cache, cancelamento) é
 * derivado do hook gerado pelo RTK Query. Não há `useState`/`useEffect` aqui:
 * o estado do servidor vive no store, não no componente.
 */
const ProdutosComponent = () => {
  const { data: produtos, isLoading, isError } = useGetProdutosQuery()

  if (isLoading) {
    return <p role="status">Carregando produtos...</p>
  }

  if (isError) {
    // Mensagem genérica de propósito: expor o erro cru da API ao usuário
    // vazaria detalhes de infraestrutura (host, stack, status interno).
    return <p role="alert">Não foi possível carregar os produtos.</p>
  }

  return (
    <S.Produtos>
      {produtos?.map((produto) => (
        <Produto key={produto.id} produto={produto} />
      ))}
    </S.Produtos>
  )
}

export default ProdutosComponent
