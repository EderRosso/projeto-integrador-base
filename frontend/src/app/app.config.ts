import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { ProdutosService } from './features/produtos/services/produtos.service';
import { ProdutosMockService } from './features/produtos/services/produtos-mock.service';
import { ServicoService, ServicoMockService } from './features/servicos/servico.service';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ProdutosService, useClass: ProdutosMockService },
    { provide: ServicoService, useClass: ServicoMockService }
  ]
};