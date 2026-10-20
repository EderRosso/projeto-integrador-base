import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const CATEGORIAS = ['alimento', 'higiene', 'limpeza', 'outros'] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export type ProdutoDocument = HydratedDocument<Produto>;

// timestamps: true cria createdAt e updatedAt automaticamente (PDF 03, cap. 14)
@Schema({ timestamps: true, collection: 'produtos' })
export class Produto {
  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 80,
    unique: true,
  })
  nome: string;

  @Prop({ trim: true, maxlength: 300 })
  descricao?: string;

  @Prop({ required: true, min: 0 })
  preco: number;

  @Prop({ required: true, min: 0, default: 0 })
  estoque: number;

  @Prop({ type: String, required: true, enum: CATEGORIAS })
  categoria: Categoria;

  @Prop({ default: true })
  ativo: boolean;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);

// Índice para o filtro mais usado na listagem (PDF 03, cap. 12)
ProdutoSchema.index({ categoria: 1 });
