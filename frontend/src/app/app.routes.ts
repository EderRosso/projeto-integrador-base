import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cliente', pathMatch: 'full' },
  {
    path: 'servicos',
    loadChildren: () => import('./features/servicos/servicos.routes').then(m => m.SERVICOS_ROUTES)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./features/produtos/produtos.routes').then(m => m.PRODUTOS_ROUTES)
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./features/relatorios/relatorios.routes').then(m => m.RELATORIOS_ROUTES)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./features/clientes/cliente.routes').then(m => m.CLIENTE_ROUTES)
  },
  
];