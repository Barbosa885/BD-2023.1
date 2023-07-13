import { Injectable } from '@nestjs/common';
import { CreateDespartamentoDto } from './dto/create-despartamento.dto';
import { UpdateDespartamentoDto } from './dto/update-despartamento.dto';

@Injectable()
export class DespartamentoService {
  create(createDespartamentoDto: CreateDespartamentoDto) {
    return 'This action adds a new despartamento';
  }

  findAll() {
    return `This action returns all despartamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} despartamento`;
  }

  update(id: number, updateDespartamentoDto: UpdateDespartamentoDto) {
    return `This action updates a #${id} despartamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} despartamento`;
  }
}
