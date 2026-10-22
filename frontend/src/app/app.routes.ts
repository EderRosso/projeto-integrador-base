import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'servicos', pathMatch: 'full' },
  {
    path: 'servicos',
    loadChildren: () => import('./features/servicos/servicos.routes').then(m => m.SERVICOS_ROUTES)
  },
  // Caso tenha a rota de produtos do professor, mantenha-a também:
  {
    path: 'produtos',
    loadChildren: () => import('./features/produtos/produtos.routes').then(m => m.PRODUTOS_ROUTES)
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./features/relatorios/relatorios.routes').then(m => m.RELATORIOS_ROUTES)
  },
  { path: '**', redirectTo: 'servicos' }
];
