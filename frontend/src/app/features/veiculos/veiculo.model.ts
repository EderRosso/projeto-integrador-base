export interface Veiculo {
    _id: string;
    placa: string;
    modelo: string;
    cor: string;
    ano: number;
    defeitoRelatado: string;
    status: string;
}

export type CriarVeiculoDTO = Omit<Veiculo, '_id'>;