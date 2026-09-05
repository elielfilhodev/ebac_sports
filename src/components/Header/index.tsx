import * as S from './styles'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../../utils'
import { useAppSelector } from '../../store/hooks'
import {
  selectQuantidadeDeFavoritos,
  selectQuantidadeNoCarrinho,
  selectValorTotalDoCarrinho
} from '../../store/selectors'

/**
 * O Header não recebe mais props: ele lê o que precisa direto do store.
 *
 * Repare que são três `useSelector` com valores primitivos, e não um único
 * seletor devolvendo um objeto. Um objeto novo a cada execução falharia na
 * comparação por referência (`===`) do react-redux e re-renderizaria o Header a
 * cada ação despachada na aplicação inteira.
 */
const Header = () => {
  const quantidadeDeFavoritos = useAppSelector(selectQuantidadeDeFavoritos)
  const quantidadeNoCarrinho = useAppSelector(selectQuantidadeNoCarrinho)
  const valorTotal = useAppSelector(selectValorTotalDoCarrinho)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{quantidadeDeFavoritos} favoritos</span>
        <img src={cesta} alt="Carrinho de compras" />
        <span>
          {quantidadeNoCarrinho} itens, valor total: {paraReal(valorTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
