import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar" style="padding: 15px; background: #333; display: flex; gap: 15px;">
      <a routerLink="/produtos" style="color: white; text-decoration: none;">Produtos</a>
      <a routerLink="/servicos" style="color: white; text-decoration: none;">Serviços e Valores</a>
      <a routerLink="/relatorios" style="color: white; text-decoration: none;">Relatórios</a>
      <a routerLink="/clientes" style="color: white; text-decoration: none;">Clientes</a>
    </nav>
    <main style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {}