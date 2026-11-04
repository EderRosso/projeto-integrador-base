import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { OrdemServico, StatusOrdemServico } from './schemas/ordem-servico.schema';
import { OrdemServicoService } from './ordem-servico.service';

describe('OrdemServicoService', () => {
  let service: OrdemServicoService;

  const mockOrdemServico = {
    _id: '64a1b2c3d4e5f6g7h8i9j0k1',
    cliente: 'João Silva',
    veiculo: 'Fiat Uno',
    descricaoServico: 'Troca de óleo',
    status: StatusOrdemServico.NA_FILA,
    valorTotal: 150.0,
  };

  class MockModel {
    constructor(private data: any) {}
    save = jest.fn().mockImplementation(() => Promise.resolve({
      _id: '64a1b2c3d4e5f6g7h8i9j0k1',
      ...this.data,
    }));
    static find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockOrdemServico]),
    });
    static findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockOrdemServico),
    });
    static findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockOrdemServico),
    });
    static findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockOrdemServico),
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdemServicoService,
        {
          provide: getModelToken(OrdemServico.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<OrdemServicoService>(OrdemServicoService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma ordem de serviço com sucesso', async () => {
    const dto = {
      cliente: 'João Silva',
      veiculo: 'Fiat Uno',
      descricaoServico: 'Troca de óleo',
      status: StatusOrdemServico.NA_FILA,
      valorTotal: 150.0,
    };
    const result = await service.create(dto);
    expect(result).toHaveProperty('_id');
    expect(result.cliente).toEqual(dto.cliente);
  });

  it('deve listar todas as ordens de serviço', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockOrdemServico]);
  });

  it('deve encontrar uma ordem de serviço por ID', async () => {
    const result = await service.findOne('64a1b2c3d4e5f6g7h8i9j0k1');
    expect(result).toEqual(mockOrdemServico);
  });

  it('deve lançar NotFoundException se a ordem de serviço não for encontrada por ID', async () => {
    jest.spyOn(MockModel, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.findOne('id-invalido')).rejects.toThrow(NotFoundException);
  });
});