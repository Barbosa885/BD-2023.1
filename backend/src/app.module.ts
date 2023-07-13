import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { EstudanteModule } from './estudante/estudante.module';
import { ProfessorModule } from './professor/professor.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { TurmaModule } from './turma/turma.module';
import { DespartamentoModule } from './despartamento/despartamento.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { DenunciaModule } from './denuncia/denuncia.module';
import { AuthModule } from './auth/auth.module';

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
          database: 'barbosadb',
        },
      },
    }),
    EstudanteModule,
    ProfessorModule,
    DisciplinaModule,
    TurmaModule,
    DespartamentoModule,
    AvaliacaoModule,
    DenunciaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
