export interface Servico {
  _id?: string;
  nome: string;          // Ex: "Troca de Óleo"
  descricao: string;     // Ex: "Substituição do óleo do motor e filtro"
  preco: number;         // Ex: 150.00
  tempoEstimado: string; // Ex: "45 min"
}

export type ServicoInput = Omit<Servico, '_id'>;