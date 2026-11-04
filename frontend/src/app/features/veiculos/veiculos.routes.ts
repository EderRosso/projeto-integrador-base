import { Routes } from "@angular/router";
import { VeiculoFormComponent } from "./veiculo-form/veiculo-form";
import { VeiculosListaComponent } from "./veiculos-lista/veiculos-lista";


export const VEICULOS_ROUTES: Routes = [
    { path: '', component: VeiculosListaComponent },

    { path: 'novo', component: VeiculoFormComponent },

    { path: 'editar/:id', component: VeiculoFormComponent }
];

