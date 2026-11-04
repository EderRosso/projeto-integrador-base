import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrdemServicoDocument = OrdemServico & Document;

export enum StatusOrdemServico {
  NA_FILA = 'Na Fila',
  EM_CONSERTO = 'Em Conserto',
  PRONTO = 'Pronto',
}

@Schema({ timestamps: true })
export class OrdemServico {
  @Prop({ required: true })
  cliente: string;

  @Prop({ required: true })
  veiculo: string;

  @Prop({ required: true })
  descricaoServico: string;

  @Prop({ required: true, enum: StatusOrdemServico, default: StatusOrdemServico.NA_FILA })
  status: StatusOrdemServico;

  @Prop({ required: true })
  valorTotal: number;
}

export const OrdemServicoSchema = SchemaFactory.createForClass(OrdemServico);