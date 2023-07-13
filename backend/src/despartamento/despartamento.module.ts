import { Module } from '@nestjs/common';
import { DespartamentoService } from './despartamento.service';
import { DespartamentoController } from './despartamento.controller';

@Module({
  controllers: [DespartamentoController],
  providers: [DespartamentoService]
})
export class DespartamentoModule {}
