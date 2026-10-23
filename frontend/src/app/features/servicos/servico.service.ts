import { Injectable, signal } from '@angular/core';
import { Servico, ServicoInput } from './servico.model';

export abstract class ServicoService {
  abstract listar(): Promise<Servico[]>;
  abstract criar(servico: ServicoInput): Promise<Servico>;
  abstract excluir(id: string): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoMockService implements ServicoService {
  private servicos = signal<Servico[]>([
    {
      _id: '1',
      nome: 'Troca de Óleo',
      descricao: 'Substituição do óleo do motor e filtro',
      preco: 150.00,
      tempoEstimado: '45 min'
    },
    {
      _id: '2',
      nome: 'Alinhamento e Balanceamento',
      descricao: 'Ajuste da geometria da suspensão e rodas',
      preco: 120.00,
      tempoEstimado: '1 hora'
    },
    {
      _id: '3',
      nome: 'Troca de Pastilhas de Freio',
      descricao: 'Substituição das pastilhas dianteiras',
      preco: 250.00,
      tempoEstimado: '1h 30min'
    }
  ]);

  async listar(): Promise<Servico[]> {
    await new Promise(r => setTimeout(r, 300));
    return this.servicos();
  }

  async criar(input: ServicoInput): Promise<Servico> {
    await new Promise(r => setTimeout(r, 300));
    const novo: Servico = {
      ...input,
      _id: Math.random().toString(36).substr(2, 9)
    };
    this.servicos.update(lista => [...lista, novo]);
    return novo;
  }

  async excluir(id: string): Promise<void> {
    await new Promise(r => setTimeout(r, 200));
    this.servicos.update(lista => lista.filter(s => s._id !== id));
  }
}