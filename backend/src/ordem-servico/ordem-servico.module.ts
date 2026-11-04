import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdemServico, OrdemServicoSchema } from './schemas/ordem-servico.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrdemServico.name, schema: OrdemServicoSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class OrdemServicoModule {}