import Header from './components/Header'
import Produtos from './containers/Produtos'

import { GlobalStyle } from './styles'

/**
 * Após a migração para Redux, `App` volta a ser o que deveria ser: composição
 * de layout. Nada de `useState`, `useEffect` ou prop drilling — cada componente
 * assina exatamente a fatia de estado de que precisa.
 */
function App() {
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header />
        <Produtos />
      </div>
    </>
  )
}

export default App
