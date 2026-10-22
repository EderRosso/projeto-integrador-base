import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioService } from '../relatorio.service';
import { RelatorioOficina } from '../relatorio.model';

@Component({
  selector: 'app-relatorio-painel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio-painel.html',
  styleUrls: ['./relatorio-painel.css']
})
export class RelatorioPainel implements OnInit {
  private service = inject(RelatorioService);

  relatorio = signal<RelatorioOficina | null>(null);
  carregando = signal<boolean>(true);

  async ngOnInit() {
    this.carregando.set(true);
    const dados = await this.service.obterResumo();
    this.relatorio.set(dados);
    this.carregando.set(false);
  }
}