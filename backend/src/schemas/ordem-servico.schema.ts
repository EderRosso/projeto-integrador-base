import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrdemServicoDocument = OrdemServico & Document;

// 1. Enum para os status da Ordem de Serviço
export enum StatusOrdemServico {
  ABERTA = 'Aberta',
  EM_ANDAMENTO = 'Em Andamento',
  CONCLUIDA = 'Concluída',
  CANCELADA = 'Cancelada',
}

@Schema({ timestamps: true }) // 4. Ativa timestamps (createdAt, updatedAt)
export class OrdemServico {
  // Referência ao Cliente
  @Prop({ type: Types.ObjectId, ref: 'Cliente', required: true })
  clienteId: Types.ObjectId;

  // Referência ao Veículo
  @Prop({ type: Types.ObjectId, ref: 'Veiculo', required: true })
  veiculoId: Types.ObjectId;

  // 1 & 2. Validações e Enum de status com valor padrão
  @Prop({
    required: true,
    enum: StatusOrdemServico,
    default: StatusOrdemServico.ABERTA,
  })
  status: StatusOrdemServico;

  @Prop({ required: true, trim: true, minlength: 5, maxlength: 500 })
  descricaoProblema: string;

  @Prop({ type: Number, required: true, min: 0 })
  valorEstimado: number;

  @Prop({ type: [String], default: [] })
  pecasUtilizadas: string[];
}

export const OrdemServicoSchema = SchemaFactory.createForClass(OrdemServico);

// 3. Configurar índices justificados (otimizar buscas por cliente e status)
OrdemServicoSchema.index({ clienteId: 1, status: 1 });