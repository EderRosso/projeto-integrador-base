# Atualizações do repositório base

Cada atualização tem uma etiqueta (*tag*) e diz se o grupo precisa fazer alguma coisa depois do merge.
Para receber: veja o **Passo 4** de [`COMECE-AQUI.md`](COMECE-AQUI.md).

---

## v1.1 — Aula 02 · Front-end com Angular

**Etiqueta:** `base-v1.1`

- Novo componente reutilizável `ProdutoCard` (`features/produtos/produto-card/`), com `input()` e `output()`.
- A listagem de Produtos ganhou os botões **Tabela / Cartões** (exemplo de `@if`, evento e componente filho).
- Estilos do cartão em `styles.css`.
- Roteiro da aula em `guia/aulas/aula-02.md`: onde ver cada conceito no projeto, atividade, entrega e critérios.

**O que o grupo precisa fazer:** só o merge. Nenhum arquivo do grupo foi alterado.

---

## v1.0 — Aula 01 · versão inicial

**Etiqueta:** `base-v1.0`

- Projeto base: Angular 21 + NestJS 11 + MongoDB, com o módulo de exemplo Produtos.
- Manuais dos 6 temas em `guia/temas/`.
- Receitas comuns em `guia/RECEITAS.md`.
- Manual de Construção, templates e responsabilidades em `guia/`.
- Testes automáticos em cada Pull Request (`.github/workflows/ci.yml`).
- Tipo `Referencia` e funções `idDe` / `textoDe` em `frontend/src/app/core/models/referencia.ts`.
- Arquivo `frontend/src/estilos-do-grupo.css` para os estilos do grupo.

**O que o grupo precisa fazer:** seguir o `COMECE-AQUI.md`.
