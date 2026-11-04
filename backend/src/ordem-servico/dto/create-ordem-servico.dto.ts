import { IsEnum, IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';
import { StatusOrdemServico } from '../schemas/ordem-servico.schema';

export class CreateOrdemServicoDto {
  @IsNotEmpty({ message: 'O cliente é obrigatório.' })
  @IsString()
  cliente: string;

  @IsNotEmpty({ message: 'O veículo é obrigatório.' })
  @IsString()
  veiculo: string;

  @IsNotEmpty({ message: 'A descrição do serviço é obrigatória.' })
  @IsString()
  descricaoServico: string;

  @IsOptional()
  @IsEnum(StatusOrdemServico, { message: 'Status inválido.' })
  status?: StatusOrdemServico;

  @IsNotEmpty({ message: 'O valor total é obrigatório.' })
  @IsNumber({}, { message: 'O valor total deve ser um número.' })
  valorTotal: number;
}