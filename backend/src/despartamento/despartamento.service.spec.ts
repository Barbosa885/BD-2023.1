import { Test, TestingModule } from '@nestjs/testing';
import { DespartamentoService } from './despartamento.service';

describe('DespartamentoService', () => {
  let service: DespartamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DespartamentoService],
    }).compile();

    service = module.get<DespartamentoService>(DespartamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
