import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Formato padrão de toda resposta de SUCESSO da API.
 * O front-end sempre lê os dados em `resposta.dados`.
 */
export interface RespostaPadrao<T> {
  sucesso: true;
  dados: T;
}

@Injectable()
export class RespostaInterceptor<T> implements NestInterceptor<
  T,
  RespostaPadrao<T>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<RespostaPadrao<T>> {
    return next.handle().pipe(map((dados) => ({ sucesso: true, dados })));
  }
}
