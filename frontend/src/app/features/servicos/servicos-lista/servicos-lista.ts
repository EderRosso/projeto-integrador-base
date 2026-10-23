import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicoService } from '../servico.service';
import { Servico } from '../servico.model';

@Component({
  selector: 'app-servicos-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servicos-lista.html',
  styleUrls: ['./servicos-lista.css']
})
export class ServicosLista implements OnInit {
  private servicoService = inject(ServicoService);

  servicos = signal<Servico[]>([]);
  carregando = signal<boolean>(true);

  async ngOnInit() {
    await this.carregar();
  }

  async carregar() {
    this.carregando.set(true);
    const lista = await this.servicoService.listar();
    this.servicos.set(lista);
    this.carregando.set(false);
  }

  async excluir(id?: string) {
    if (!id) return;
    if (confirm('Deseja realmente remover este serviço do catálogo?')) {
      await this.servicoService.excluir(id);
      await this.carregar();
    }
  }
}