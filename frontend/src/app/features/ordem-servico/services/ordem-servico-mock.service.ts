import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrdemServico, OrdemServicoInput, StatusOrdemServico } from '../ordem-servico.model';
import { OrdemServicoService } from './ordem-servico.service';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoMockService implements OrdemServicoService {
  private ordens = signal<OrdemServico[]>([
    { _id: '1', veiculo: 'Fiat Uno', placa: 'ABC-1234', cliente: 'Carlos', descricaoProblema: 'Troca de óleo', status: 'Na Fila', dataEntrada: '2026-10-21' },
    { _id: '2', veiculo: 'Onix', placa: 'XYZ-5678', cliente: 'Ana', descricaoProblema: 'Travões', status: 'Em Conserto', dataEntrada: '2026-10-20' },
    { _id: '3', veiculo: 'Gol', placa: 'KLM-9012', cliente: 'Roberto', descricaoProblema: 'Alinhamento', status: 'Pronto', dataEntrada: '2026-10-19' }
  ]);

  listar(): Observable<OrdemServico[]> { return of(this.ordens()); }
  obterPorId(id: string): Observable<OrdemServico | undefined> { return of(this.ordens().find(o => o._id === id)); }

  criar(dados: OrdemServicoInput): Observable<OrdemServico> {
    const nova: OrdemServico = { ...dados, _id: Date.now().toString() };
    this.ordens.update(lista => [...lista, nova]);
    return of(nova);
  }

  atualizar(id: string, dados: Partial<OrdemServico>): Observable<OrdemServico> {
    this.ordens.update(lista => lista.map(o => o._id === id ? { ...o, ...dados } : o));
    return of(this.ordens().find(o => o._id === id)!);
  }

  atualizarStatus(id: string, status: StatusOrdemServico): Observable<OrdemServico> {
    return this.atualizar(id, { status });
  }
}