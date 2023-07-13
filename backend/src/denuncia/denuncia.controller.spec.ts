import { Test, TestingModule } from '@nestjs/testing';
import { DenunciaController } from './denuncia.controller';
import { DenunciaService } from './denuncia.service';

describe('DenunciaController', () => {
  let controller: DenunciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DenunciaController],
      providers: [DenunciaService],
    }).compile();

    controller = module.get<DenunciaController>(DenunciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
