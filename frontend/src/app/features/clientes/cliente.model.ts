export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Cliente {
  id?: number;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email?: string;
  endereco: Endereco;
  observacoes?: string;
}