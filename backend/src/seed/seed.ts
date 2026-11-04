/**
 * Popula o banco com dados de exemplo.
 * Uso: npm run seed
 * Cada aluno acrescenta aqui os dados do seu módulo (aula 08).
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { ProdutoSchema } from '../produtos/schemas/produto.schema';
import { OrdemServicoSchema, StatusOrdemServico } from '../schemas/ordem-servico.schema';

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

const ordensServico = [
  {
    clienteId: new mongoose.Types.ObjectId(),
    veiculoId: new mongoose.Types.ObjectId(),
    status: StatusOrdemServico.ABERTA,
    descricaoProblema: 'Troca de óleo e substituição dos filtros de ar e combustível',
    valorEstimado: 350.00,
    pecasUtilizadas: ['Óleo 5W30', 'Filtro de Óleo'],
  },
  {
    clienteId: new mongoose.Types.ObjectId(),
    veiculoId: new mongoose.Types.ObjectId(),
    status: StatusOrdemServico.EM_ANDAMENTO,
    descricaoProblema: 'Revisão do sistema de freios e troca das pastilhas dianteiras',
    valorEstimado: 480.00,
    pecasUtilizadas: ['Pastilha de Freio Frontal'],
  },
  {
    clienteId: new mongoose.Types.ObjectId(),
    veiculoId: new mongoose.Types.ObjectId(),
    status: StatusOrdemServico.CONCLUIDA,
    descricaoProblema: 'Alinhamento 3D e balanceamento das quatro rodas',
    valorEstimado: 180.00,
    pecasUtilizadas: [],
  },
  {
    clienteId: new mongoose.Types.ObjectId(),
    veiculoId: new mongoose.Types.ObjectId(),
    status: StatusOrdemServico.ABERTA,
    descricaoProblema: 'Diagnóstico de barulho na suspensão traseira',
    valorEstimado: 250.00,
    pecasUtilizadas: [],
  },
  {
    clienteId: new mongoose.Types.ObjectId(),
    veiculoId: new mongoose.Types.ObjectId(),
    status: StatusOrdemServico.CANCELADA,
    descricaoProblema: 'Troca da correia dentada e tensor do motor',
    valorEstimado: 620.00,
    pecasUtilizadas: ['Correia Dentada', 'Tensor'],
  },
];

async function seed() {
  const uri =
    process.env.MONGODB_URI ?? 'mongodb://localhost:27017/projeto-integrador';
  await mongoose.connect(uri);

  // Produtos
  const Produto = mongoose.model('Produto', ProdutoSchema, 'produtos');
  await Produto.deleteMany({});
  await Produto.insertMany(produtos);
  console.log(`✓ ${produtos.length} produtos inseridos`);

  // Ordens de Serviço (Aula 08)
  const OrdemServico = mongoose.model('OrdemServico', OrdemServicoSchema, 'ordem-servico');
  await OrdemServico.deleteMany({});
  await OrdemServico.insertMany(ordensServico);
  console.log(`✓ ${ordensServico.length} ordens de serviço inseridas`);

  await mongoose.disconnect();
}

seed().catch((erro) => {
  console.error('Erro no seed:', erro);
  process.exit(1);
});