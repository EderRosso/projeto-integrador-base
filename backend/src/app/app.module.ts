import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutosModule } from '../produtos/produtos.module';
import { OrdemServicoModule } from '../ordem-servico/ordem-servico.module';

@Module({
  imports: [
    // Lê o arquivo .env (copie o .env.example para .env)
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexão com o MongoDB usando a variável MONGODB_URI
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>(
          'MONGODB_URI',
          'mongodb://localhost:27017/projeto-integrador',
        ),
      }),
    }),

    // Módulos da aplicação
    ProdutosModule,
    OrdemServicoModule, // Adicionado aqui
  ],
})
export class AppModule {}