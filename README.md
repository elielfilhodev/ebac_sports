# EBAC Sports — Migração de `useState` para Redux Toolkit

Projeto do exercício da EBAC refatorado: o gerenciamento de estado local
(`useState` + `useEffect` + `fetch` dentro do `App`) foi substituído por
**Redux Toolkit**, com **RTK Query** para o estado de servidor.

## Requisitos do exercício

| Requisito | Onde está |
| --- | --- |
| Usar o Redux Toolkit | `src/store/index.ts` (`configureStore`) |
| Criar um slice para o carrinho | `src/store/reducers/carrinho.ts` (`createSlice`) |
| Usar RTK Query para as requisições | `src/services/api.ts` (`createApi` + `useGetProdutosQuery`) |
| Usar `useSelector` | `src/store/hooks.ts` (`useAppSelector`), consumido em `Header` e `Produto` |
| Usar `useDispatch` | `src/store/hooks.ts` (`useAppDispatch`), consumido em `Produto` |

## Arquitetura

```
src/
├── types/                # contratos de domínio (Produto)
├── utils/                # funções puras (paraReal)
├── services/
│   └── api.ts            # RTK Query: cache, loading, erro, validação de payload
├── store/
│   ├── index.ts          # configureStore + RootState/AppDispatch
│   ├── hooks.ts          # useAppSelector / useAppDispatch tipados
│   ├── selectors.ts      # leitura memoizada do estado (createSelector)
│   ├── reducers/
│   │   ├── carrinho.ts   # slice do carrinho
│   │   └── favoritos.ts  # slice de favoritos
│   └── __tests__/        # testes unitários dos reducers e selectors
├── components/           # Header e Produto (conectados ao store)
└── containers/           # Produtos (consome o hook do RTK Query)
```

### Decisões e o "porquê"

**Estado de servidor ≠ estado de cliente.** A lista de produtos vem da API e é
gerenciada pelo RTK Query (cache, deduplicação, `isLoading`/`isError`,
cancelamento no unmount). Carrinho e favoritos são estado de cliente e vivem em
slices próprios. Misturar os dois no mesmo lugar é a origem clássica de bugs de
sincronização.

**Slices separados por domínio.** Carrinho e favoritos têm ciclos de vida
distintos. Um slice único faria o `Header` re-renderizar por mudanças que não
lhe dizem respeito.

**Reducers puros.** O `alert('Item já adicionado')` ficou na camada de UI. Um
efeito colateral dentro do reducer quebraria replay de ações, time-travel
debugging e testes determinísticos. O reducer `adicionar` é idempotente como
segunda linha de defesa.

**Selectors centralizados e memoizados.** Nenhum componente lê
`state.carrinho.itens` diretamente. Derivados (`valorTotal`, `Set` de ids) usam
`createSelector` para não recriar objetos a cada render — o que dispararia
re-render em loop no `useSelector`, que compara por referência.

**Fim do prop drilling.** `App` deixou de repassar quatro props por dois níveis.
`Header` e `Produto` assinam apenas a fatia de estado que consomem.

**Hooks tipados.** `useAppSelector` / `useAppDispatch` evitam anotar `RootState`
em cada componente e garantem autocomplete.

### Notas de segurança

- **Validação de payload em runtime** (`ehProduto` em `src/services/api.ts`):
  TypeScript só valida em tempo de compilação; o que chega da rede é `any`. A
  guarda impede que um contrato quebrado da API entre na árvore de estado.
- **Mensagens de erro genéricas** na UI: não expõem host, status interno nem
  stack trace.
- **URL base sem interpolação de input do usuário**, com override opcional via
  `REACT_APP_API_URL` — sem host fixo no bundle em produção.
- **CI com `npm ci` + `npm audit`**: build reprodutível pelo lockfile e
  verificação de vulnerabilidades conhecidas nas dependências.

## Como rodar

```bash
npm install
npm start          # http://localhost:3000
npm test           # testes dos reducers e selectors
npm run build      # build de produção
npx eslint "src/**/*.{ts,tsx}"
```

## Variáveis de ambiente (opcional)

```bash
REACT_APP_API_URL=https://api-ebac.vercel.app/api/
```
