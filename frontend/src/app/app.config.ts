
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { ProdutosApiService } from './features/produtos/services/produtos-api.service';
import { ProdutosMockService } from './features/produtos/services/produtos-mock.service';
import { ProdutosService } from './features/produtos/services/produtos.service';
import { OrdemServicoMockService } from './features/ordem-servico/services/ordem-servico-mock.service';
import { OrdemServicoService } from './features/ordem-servico/services/ordem-servico.service';
import { VeiculosService } from './features/veiculos/services/veiculos.service';
import { VeiculosMockService } from './features/veiculos/services/veiculos-mock.service';
import { BuscaStatusService } from './features/busca-status/services/busca-status';
import { BuscaStatusMockService } from './features/busca-status/services/busca-status-mock.service';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    {
      provide: OrdemServicoService,
      useClass: OrdemServicoMockService,
    },

   { provide: VeiculosService, useClass: VeiculosMockService },
{ provide: BuscaStatusService, useClass: BuscaStatusMockService },
    // Escolhe a implementação do serviço conforme o environment.
    // Cada aluno registra aqui o serviço do seu módulo, do mesmo jeito.
    {
      provide: ProdutosService,
      useClass: environment.usarMock ? ProdutosMockService : ProdutosApiService,
    },
  ],
};
