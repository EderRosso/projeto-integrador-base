/** Formato padrão das respostas de sucesso da API (ver RespostaInterceptor no back-end). */
export interface RespostaApi<T> {
  sucesso: true;
  dados: T;
}
