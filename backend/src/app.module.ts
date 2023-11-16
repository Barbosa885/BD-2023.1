import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { EstudantesModule } from './estudantes/estudantes.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: 'localhost',
          user: 'postgres',
          port: 5432,
          password: 'postgres',
          database: 'uniavalia',
        },
      },
    }),
    EstudantesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
