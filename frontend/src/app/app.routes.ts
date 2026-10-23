
import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Inicio } from './pages/inicio/inicio';
import { NaoEncontrado } from './pages/nao-encontrado/nao-encontrado';
import { OrdemServicoLista } from './features/ordem-servico/ordem-servico-lista/ordem-servico-lista';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Inicio,
        title: 'Início',
      },
      {
        path: 'servicos',
        loadChildren: () =>
          import('./features/servicos/servicos.routes').then(
            (m) => m.SERVICOS_ROUTES
          ),
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./features/produtos/produtos.routes').then(
            (m) => m.PRODUTOS_ROUTES
          ),
      },
      {
        path: 'ordem-servico',
        component: OrdemServicoLista,
        title: 'Ordens de Serviço',
      },
      {
        path: 'veiculos',
        loadChildren: () =>
          import('./features/veiculos/veiculos.routes').then(
            (m) => m.VEICULOS_ROUTES
          ),
      },
      {
        path: 'busca-status',
        loadChildren: () =>
          import('./features/busca-status/busca-status.routes').then(
            (m) => m.BUSCA_STATUS_ROUTES
          ),
      },
      {
        path: 'relatorios',
        loadChildren: () =>
          import('./features/relatorios/relatorios.routes').then(
            (m) => m.RELATORIOS_ROUTES
          ),
      },
    ],
  },
  {
    path: '**',
    component: NaoEncontrado,
    title: 'Página não encontrada',
  },
];
