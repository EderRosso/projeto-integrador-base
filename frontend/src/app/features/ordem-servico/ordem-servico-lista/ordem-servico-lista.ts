import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemServicoService } from '../services/ordem-servico.service';
import { OrdemServico, StatusOrdemServico } from '../ordem-servico.model';
import { OrdemServicoCard } from '../ordem-servico-card/ordem-servico-card';

@Component({
  selector: 'app-ordem-servico-lista',
  standalone: true,
  imports: [CommonModule, OrdemServicoCard],
  templateUrl: './ordem-servico-lista.html',
  styleUrl: './ordem-servico-lista.css'
})
export class OrdemServicoLista implements OnInit {
  private service = inject(OrdemServicoService);

  ordens = signal<OrdemServico[]>([]);
  carregando = signal<boolean>(true);
  erro = signal<string | null>(null);

  ngOnInit() {
    this.carregarOrdens();
  }

  carregarOrdens() {
    this.carregando.set(true);
    this.service.listar().subscribe({
      next: (dados) => {
        this.ordens.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar as ordens de serviço.');
        this.carregando.set(false);
      }
    });
  }

  onMudarStatus(id: string, novoStatus: StatusOrdemServico) {
    this.service.atualizarStatus(id, novoStatus).subscribe(() => {
      this.carregarOrdens();
    });
  }
}