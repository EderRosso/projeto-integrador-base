import { Routes } from '@angular/router';
import { ClienteLista } from './cliente-lista/cliente-lista';
import { ClienteForm } from './cliente-form/cliente-form';

export const CLIENTE_ROUTES: Routes = [
  { path: '', component: ClienteLista },
  { path: 'novo', component: ClienteForm },
  { path: 'editar/:id', component: ClienteForm }
];