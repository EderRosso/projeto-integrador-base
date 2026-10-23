import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { VeiculosService } from './veiculos.service';
import { Veiculo, CriarVeiculoDTO } from '../veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculosMockService implements VeiculosService {
  private veiculos: Veiculo[] = [
    { _id: '1', placa: 'ABC-1234', modelo: 'Gol', cor: 'Branco', ano: 2015, defeitoRelatado: 'Motor falhando', status: 'Na Fila' },
    { _id: '2', placa: 'XYZ-9876', modelo: 'Civic', cor: 'Preto', ano: 2020, defeitoRelatado: 'Troca de óleo', status: 'Em Conserto' },
    { _id: '3', placa: 'DEF-5678', modelo: 'Onix', cor: 'Prata', ano: 2022, defeitoRelatado: 'Bateria descarregada', status: 'Pronto' }
  ];

  listar(): Observable<Veiculo[]> {
    return of([...this.veiculos]).pipe(delay(500)); 
  }

  buscarPorId(id: string): Observable<Veiculo> {
    const v = this.veiculos.find(x => x._id === id);
    if (!v) throw new Error('Veículo não encontrado');
    return of({ ...v }).pipe(delay(300));
  }

  criar(dto: CriarVeiculoDTO): Observable<Veiculo> {
    const novo: Veiculo = { ...dto, _id: Math.random().toString(), status: 'Na Fila' };
    this.veiculos.push(novo);
    return of(novo).pipe(delay(500));
  }

  atualizar(id: string, dados: Partial<Veiculo>): Observable<Veiculo> {
    const index = this.veiculos.findIndex(x => x._id === id);
    this.veiculos[index] = { ...this.veiculos[index], ...dados };
    return of({ ...this.veiculos[index] }).pipe(delay(500));
  }

  excluir(id: string): Observable<void> {
    this.veiculos = this.veiculos.filter(x => x._id !== id);
    return of(undefined).pipe(delay(500));
  }
}
