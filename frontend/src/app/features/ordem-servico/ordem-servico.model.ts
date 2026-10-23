export type StatusOrdemServico = 'Na Fila' | 'Em Conserto' | 'Pronto';

export interface OrdemServico {
  _id: string;
  veiculo: string;
  placa: string;
  cliente: string;
  descricaoProblema: string;
  status: StatusOrdemServico;
  dataEntrada: string;
}

export type OrdemServicoInput = Omit<OrdemServico, '_id'>;