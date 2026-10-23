import { Observable } from 'rxjs';
import { StatusVeiculo } from '../busca-status.model';

export abstract class BuscaStatusService {
  abstract buscarPorPlaca(placa: string): Observable<StatusVeiculo | null>;
}

