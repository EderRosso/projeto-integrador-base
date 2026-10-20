import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/** Componente de layout: cabeçalho, menu lateral e área de conteúdo (PDF 02, cap. 4). */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  // TODO (aula 01/02): troque pelo nome do sistema do seu grupo
  protected readonly nomeSistema = 'Projeto Integrador';
}
