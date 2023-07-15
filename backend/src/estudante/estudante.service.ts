import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';

@Injectable()
export class EstudanteService {
  constructor(private readonly knex: Knex) {}

  async create(createEstudanteDto: CreateEstudanteDto) {
    const query = `
      INSERT INTO estudante (Nome, Email, Curso, Senha, Tipo)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      createEstudanteDto.nome,
      createEstudanteDto.email,
      createEstudanteDto.curso,
      createEstudanteDto.senha,
      createEstudanteDto.tipo,
    ];

    await this.knex.raw(query, values);
    return 'Estudante created successfully';
  }

  findAll() {
    return `This action returns all estudante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudante`;
  }

  update(id: number, updateEstudanteDto: UpdateEstudanteDto) {
    return `This action updates a #${id} estudante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudante`;
  }
}
