import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrdemServico, OrdemServicoDocument } from './schemas/ordem-servico.schema';import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';

@Injectable()
export class OrdemServicoService {
  constructor(
    @InjectModel(OrdemServico.name) private ordemServicoModel: Model<OrdemServicoDocument>,
  ) {}

  async create(createDto: CreateOrdemServicoDto): Promise<OrdemServico> {
    const novaOrdem = new this.ordemServicoModel(createDto);
    return novaOrdem.save();
  }

  async findAll(): Promise<OrdemServico[]> {
    return this.ordemServicoModel.find().exec();
  }

  async findOne(id: string): Promise<OrdemServico> {
    const ordem = await this.ordemServicoModel.findById(id).exec();
    if (!ordem) {
      throw new NotFoundException(`Ordem de serviço com ID ${id} não encontrada.`);
    }
    return ordem;
  }

  async update(id: string, updateDto: UpdateOrdemServicoDto): Promise<OrdemServico> {
    const ordemAtualizada = await this.ordemServicoModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!ordemAtualizada) {
      throw new NotFoundException(`Ordem de serviço com ID ${id} não encontrada para atualização.`);
    }
    return ordemAtualizada;
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.ordemServicoModel.findByIdAndDelete(id).exec();
    if (!resultado) {
      throw new NotFoundException(`Ordem de serviço com ID ${id} não encontrada para remoção.`);
    }
  }
}