import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { BuscaStatusService } from './busca-status';
import { StatusVeiculo } from '../busca-status.model';

@Injectable({
  providedIn: 'root'
})
export class BuscaStatusMockService extends BuscaStatusService {
  private veiculosMock: StatusVeiculo[] = [
    {
      _id: 'v1',
      placa: 'ABC-1234',
      modelo: 'Fiat Uno',
      statusAtual: 'Aguardando Peças',
      dataAtualizacao: '2026-10-20'
    },
    {
      _id: 'v2',
      placa: 'XYZ-9876',
      modelo: 'Honda Civic',
      statusAtual: 'Em Reparo',
      dataAtualizacao: '2026-10-21'
    },
    {
      _id: 'v3',
      placa: 'QWE-5555',
      modelo: 'Toyota Corolla',
      statusAtual: 'Pronto para Retirada',
      dataAtualizacao: '2026-10-22'
    }
  ];

  override buscarPorPlaca(placa: string): Observable<StatusVeiculo | null> {
    const placaBuscada = placa.trim().toUpperCase();
    
    const resultado = this.veiculosMock.find(v => v.placa === placaBuscada) || null;
    
    return of(resultado).pipe(delay(500));
  }
}

