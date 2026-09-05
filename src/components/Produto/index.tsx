import * as S from './styles'

import { Produto as ProdutoType } from '../../types'
import { paraReal } from '../../utils'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { adicionar } from '../../store/reducers/carrinho'
import { alternar } from '../../store/reducers/favoritos'
import {
  selectIdsDoCarrinho,
  selectIdsDosFavoritos
} from '../../store/selectors'

type Props = {
  produto: ProdutoType
}

/**
 * Componente conectado.
 *
 * Em vez de receber quatro props (`aoComprar`, `favoritar`, `estaNosFavoritos`)
 * vindas de dois níveis acima, o card despacha as próprias ações. Isso elimina
 * o prop drilling e mantém o container `Produtos` como um simples orquestrador
 * de lista.
 */
const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useAppDispatch()

  const idsDosFavoritos = useAppSelector(selectIdsDosFavoritos)
  const idsDoCarrinho = useAppSelector(selectIdsDoCarrinho)

  const estaNosFavoritos = idsDosFavoritos.has(produto.id)
  const estaNoCarrinho = idsDoCarrinho.has(produto.id)

  const adicionarAoCarrinho = () => {
    // O `alert` é efeito colateral e por isso fica na UI, nunca no reducer.
    // O reducer continua idempotente como segunda linha de defesa.
    if (estaNoCarrinho) {
      alert('Item já adicionado')
      return
    }

    dispatch(adicionar(produto))
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={() => dispatch(alternar(produto))} type="button">
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={adicionarAoCarrinho} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
