import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdemServicoService } from './ordem-servico.service';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';

@ApiTags('ordens-servico')
@Controller('ordens-servico')
export class OrdemServicoController {
  constructor(private readonly ordemServicoService: OrdemServicoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova ordem de serviço' })
  @ApiResponse({ status: 201, description: 'Ordem de serviço criada com sucesso.' })
  create(@Body() createOrdemServicoDto: CreateOrdemServicoDto) {
    return this.ordemServicoService.create(createOrdemServicoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as ordens de serviço' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.' })
  findAll() {
    return this.ordemServicoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma ordem de serviço por ID' })
  @ApiResponse({ status: 200, description: 'Ordem de serviço encontrada.' })
  @ApiResponse({ status: 404, description: 'Ordem de serviço não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.ordemServicoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma ordem de serviço por ID' })
  @ApiResponse({ status: 200, description: 'Ordem de serviço atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Ordem de serviço não encontrada.' })
  update(@Param('id') id: string, @Body() updateOrdemServicoDto: UpdateOrdemServicoDto) {
    return this.ordemServicoService.update(id, updateOrdemServicoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma ordem de serviço por ID' })
  @ApiResponse({ status: 200, description: 'Ordem de serviço removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Ordem de serviço não encontrada.' })
  remove(@Param('id') id: string) {
    return this.ordemServicoService.remove(id);
  }
}