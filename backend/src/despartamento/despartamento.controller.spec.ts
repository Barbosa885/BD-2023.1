import { Test, TestingModule } from '@nestjs/testing';
import { DespartamentoController } from './despartamento.controller';
import { DespartamentoService } from './despartamento.service';

describe('DespartamentoController', () => {
  let controller: DespartamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DespartamentoController],
      providers: [DespartamentoService],
    }).compile();

    controller = module.get<DespartamentoController>(DespartamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
