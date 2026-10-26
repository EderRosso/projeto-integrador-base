
  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-publica',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './pagina-publica.html',
  styleUrl: './pagina-publica.css',
})
export class PaginaPublica {
  placa = '';
  placaPesquisada = '';
  pesquisado = false;

  pesquisar(): void {
    this.placaPesquisada = this.placa.trim().toUpperCase();
    this.pesquisado = true;
  }
}