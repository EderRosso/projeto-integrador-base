# Como contribuir com o código do grupo

Combinados de Git para os 6 integrantes. Quem cuida deste fluxo é o papel **Git e Integração**.

## Branches

| Branch | Para quê | Quem mexe |
| --- | --- | --- |
| `main` | Versões entregues (checkpoints e versão final) | Só por Pull Request de `develop`, feito pelo Git e Integração |
| `develop` | Integração: o sistema de todos junto, sempre funcionando | Só por Pull Request (exceção: o merge das atualizações da base, feito pelo Git e Integração) |
| `<modulo>/<tarefa>` | O trabalho do dia de cada aluno | O dono da branch |

Exemplos de nome: `pets/listagem`, `atendimentos/fluxo-status`, `relatorios/painel`, `auth/login`.

## Commits

Mensagem no formato `tipo(módulo): o que mudou`, no presente e em português:

| Tipo | Quando | Exemplo |
| --- | --- | --- |
| `feat` | Funcionalidade nova | `feat(pets): formulário de cadastro com validação` |
| `fix` | Correção de erro | `fix(tutores): e-mail duplicado agora devolve 409` |
| `test` | Testes | `test(servicos): regra de exclusão lógica` |
| `docs` | Documentação | `docs: dicionário de dados do módulo pets` |
| `style` | Visual, CSS, formatação | `style(layout): menu responsivo` |
| `chore` | Configuração, dependências, merge da base | `chore: atualização do repositório base` |

Faça commits pequenos: um por passo que funciona.

## Pull Request

1. Antes de abrir: `git checkout develop && git pull && git checkout minha-branch && git merge develop` (traz o que mudou e resolve conflitos no seu PC).
2. Rode o lint, os testes e o build (é o que os testes automáticos do GitHub vão conferir):
   - `cd backend && npm run lint && npm test && npm run build`
   - `cd frontend && npm run build`
3. Abra o PR para `develop` e preencha o modelo (ele aparece sozinho).
4. Espere o ✓ verde dos testes automáticos e a aprovação do **Git e Integração** (ou de outro colega, quando o PR for dele).
5. Quem aprovou faz o **Merge** e apaga a branch.

## Regras de ouro

- Nunca faça `git push --force` na `develop` ou na `main`.
- Nunca suba o arquivo `.env` (ele já está no `.gitignore`).
- Alterou o módulo de um colega? Só por Pull Request, e marque o dono como revisor.
- Não altere os arquivos do professor (lista em `COMECE-AQUI.md`).
