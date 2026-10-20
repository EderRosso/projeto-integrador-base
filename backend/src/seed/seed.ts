/**
 * Popula o banco com dados de exemplo.
 * Uso: npm run seed
 * Cada aluno acrescenta aqui os dados do seu módulo (aula 08).
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { ProdutoSchema } from '../produtos/schemas/produto.schema';

const produtos = [
  {
    nome: 'Arroz integral 1 kg',
    preco: 8.9,
    estoque: 25,
    categoria: 'alimento',
  },
  { nome: 'Feijão preto 1 kg', preco: 7.5, estoque: 40, categoria: 'alimento' },
  { nome: 'Sabonete neutro', preco: 2.99, estoque: 60, categoria: 'higiene' },
  { nome: 'Detergente 500 ml', preco: 3.49, estoque: 0, categoria: 'limpeza' },
  { nome: 'Pilha AA (par)', preco: 12.0, estoque: 15, categoria: 'outros' },
];

async function seed() {
  const uri =
    process.env.MONGODB_URI ?? 'mongodb://localhost:27017/projeto-integrador';
  await mongoose.connect(uri);

  const Produto = mongoose.model('Produto', ProdutoSchema, 'produtos');
  await Produto.deleteMany({});
  await Produto.insertMany(produtos);
  console.log(`✔ ${produtos.length} produtos inseridos`);

  // TODO (aula 08): insira aqui os dados de exemplo do seu módulo

  await mongoose.disconnect();
}

seed().catch((erro) => {
  console.error('Erro no seed:', erro);
  process.exit(1);
});
