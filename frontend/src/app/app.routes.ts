import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Inicio } from './pages/inicio/inicio';
import { NaoEncontrado } from './pages/nao-encontrado/nao-encontrado';
import { OrdemServicoLista } from './features/ordem-servico/ordem-servico-lista/ordem-servico-lista';

/**
 * Mapa de rotas da aplicação (PDF 02, cap. 10).
 * Na aula 12/13, as rotas internas passam a ser protegidas por um guard
 * e surge a rota pública /login.
 */
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Inicio, title: 'Início' },
      {
        path: 'produtos',
        loadChildren: () => import('./features/produtos/produtos.routes').then((m) => m.PRODUTOS_ROUTES),
      },
      {
        path: 'ordem-servico',
        component: OrdemServicoLista,
        title: 'Ordens de Serviço'
      },
    ],
  },
  { path: '**', component: NaoEncontrado, title: 'Página não encontrada' },
];