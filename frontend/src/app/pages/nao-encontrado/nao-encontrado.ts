import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nao-encontrado',
  imports: [RouterLink],
  template: `
    <main class="cartao" style="max-width: 480px; margin: 80px auto; text-align: center">
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe.</p>
      <a class="botao" routerLink="/">Voltar ao início</a>
    </main>
  `,
})
export class NaoEncontrado {}
