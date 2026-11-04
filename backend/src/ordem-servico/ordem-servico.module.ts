import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdemServicoService } from './ordem-servico.service';
import { OrdemServicoController } from './ordem-servico.controller';
import { OrdemServico, OrdemServicoSchema } from './schemas/ordem-servico.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrdemServico.name, schema: OrdemServicoSchema },
    ]),
  ],
  controllers: [OrdemServicoController],
  providers: [OrdemServicoService],
  exports: [OrdemServicoService],
})
export class OrdemServicoModule {}