import { Routes } from '@angular/router';
import { ServicosLista } from './servicos-lista/servicos-lista';
import { ServicoForm } from './servico-form/servico-form';

export const SERVICOS_ROUTES: Routes = [
  { path: '', component: ServicosLista },
  { path: 'novo', component: ServicoForm }
];