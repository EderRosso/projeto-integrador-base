# Aula 02 — Desenvolvimento Front-End com Angular

> Apresentação: **02 – Desenvolvimento Front-End com Angular** (16 slides, no Classroom).
> Versão usada em todo o projeto: **Angular 21** (componentes standalone, `@if`/`@for`, `input()`/`output()`, signals).

Esta página liga cada conceito da aula a um arquivo **real** do projeto. Abra o arquivo enquanto estuda o slide: o módulo **Produtos** é o modelo que o seu módulo vai seguir.

## Onde ver cada conceito no projeto

| Slide | Conceito | Onde está no projeto |
| --- | --- | --- |
| 2 | Front-end, API e banco | `frontend/` (Angular) · `backend/` (NestJS) · `backend/.env.example` (MongoDB) |
| 5–6 | Ambiente e estrutura do projeto | `frontend/package.json`, `frontend/angular.json`, `frontend/src/main.ts`, `frontend/src/app/app.config.ts` |
| 7 | Componente | `frontend/src/app/features/produtos/produto-card/produto-card.ts` |
| 8 | Data binding e eventos | `produtos-lista.html`: `{{ p.nome }}`, `[class.ativo]`, `(click)="modo.set('cartoes')"` |
| 9 | `@if` e `@for` | `produtos-lista.html`: carregando, lista vazia, `@for (p of produtos(); track p._id)` |
| 10 | Pai e filho com `input()`/`output()` | `produto-card.ts` (filho) e `produtos-lista.html` (pai): `[produto]="p"` e `(excluir)="excluir($event)"` |
| 11 | Serviço e `inject()` | `features/produtos/services/`: contrato, mock e API · registro em `app.config.ts` |
| 12 | Formulário e validação | `features/produtos/produto-form/produto-form.ts` e `.html` |
| 13 | Rotas | `app.routes.ts`, `features/produtos/produtos.routes.ts`, `layout/layout.html` |
| 14 | HttpClient e API REST | `features/produtos/services/produtos-api.service.ts` · `core/models/resposta-api.ts` |
| 15 | Estado: carregando, erro, sucesso | `produtos-lista.ts`: os signals `carregando`, `erro`, `sucesso` |

## Experimente antes de começar

1. Rode o front: `cd frontend && npm start` e abra `http://localhost:4200/produtos`.
2. Clique em **Cartões**: a mesma lista agora usa o componente reutilizável `ProdutoCard`.
3. Clique em **Excluir** num cartão: o filho emite o evento e quem exclui é o pai (`excluir($event)`).
4. Abra **+ Novo produto**, digite 2 letras no nome e um preço negativo: veja as mensagens de validação.
5. Digite um endereço que não existe (`/xyz`): a rota `**` mostra a página "não encontrado".

## Atividade da aula (slide 16)

Antes de começar, o papel **Git e Integração** traz esta atualização da base para a `develop` do grupo (passo 4 do `COMECE-AQUI.md`). Depois, cada aluno cria a sua branch: `<modulo>/front` (ex.: `pets/front`).

> 💡 **Dúvidas nos comandos do Git?** Siga o roteiro passo a passo em [**`guia/GIT-E-GITHUB.md`**](../GIT-E-GITHUB.md) para criar a branch, salvar e abrir o Pull Request.

No **seu módulo**, seguindo `features/produtos` e o manual do seu tema (`guia/temas/<tema>.md`, seção "Código de partida"):

- [ ] Modelo (`<item>.model.ts`) com os campos do manual do tema
- [ ] Página de **listagem** com `@for` e mensagem de lista vazia (`@if`)
- [ ] Um **componente reutilizável** (ex.: o cartão do seu item) com `input()` e `output()`, usado pela listagem
- [ ] **Formulário** de cadastro com as validações do manual do tema e mensagens de erro
- [ ] **Rotas** da lista e do cadastro (`<modulo>.routes.ts`) + rota em `app.routes.ts` + link em `layout.html`
- [ ] **Serviço** com contrato e mock (3 registros), registrado em `app.config.ts`
- [ ] Estados de **carregando** e **erro** na listagem
- [ ] **Desafio:** subir a API (`cd backend && npm run seed && npm run start:dev`) e trocar `usarMock` para `false` em `environment.ts`: a lista de Produtos passa a vir do MongoDB

### Entrega

- Pull Request da sua branch para a `develop`, com prints das telas e o checklist do PR marcado.
- O teste automático do PR precisa ficar verde (`npm run build` no front sem erros).

### Critérios de avaliação

| Critério | Atende quando |
| --- | --- |
| Telas navegáveis | Lista e cadastro abrem pelo menu e funcionam com o mock |
| Validação | Cada campo obrigatório tem regra e mensagem que só aparece depois que o campo é tocado |
| Reuso | O componente reutilizável recebe dados por `input()` e avisa o pai por `output()` |
| Organização | Pasta `features/<modulo>/` com os mesmos nomes e camadas de Produtos |
| Qualidade | Build sem erros, sem código copiado de Produtos sobrando, nomes claros |

## Antigo × atual (não misture)

| Você pode encontrar na internet | No projeto (Angular 21) |
| --- | --- |
| `*ngIf`, `*ngFor` | `@if`, `@for (...; track ...)` |
| `@Input() produto` | `produto = input.required<Produto>()` |
| `@Output() excluir = new EventEmitter()` | `excluir = output<Produto>()` |
| `NgModule` com `declarations` | Componentes standalone com `imports` |
| `constructor(private s: Servico)` | `private s = inject(Servico)` |
| `app.component.ts`, `ProdutoFormComponent` | `app.ts`, `ProdutoForm` |
