import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { Estudante } from './entities/estudante.entity';

@Injectable()
export class EstudanteService {
  constructor(private readonly knex: Knex) {}

  async create(createEstudanteDto: CreateEstudanteDto): Promise<Estudante> {
    const [estudante] = await this.knex<Estudante>('Estudante')
      .insert(createEstudanteDto)
      .returning('*');
    return estudante as Estudante;
  }

  async findAll(): Promise<Estudante[]> {
    const estudantes = await this.knex<Estudante>('Estudante').select('*');
    return estudantes;
  }

  async findOne(id: number): Promise<Estudante> {
    const [estudante] = await this.knex<Estudante>('Estudante')
      .select('*')
      .where({ ID: id });
    return estudante as Estudante;
  }

  async update(
    id: number,
    updateEstudanteDto: UpdateEstudanteDto,
  ): Promise<Estudante> {
    const [estudante] = await this.knex<Estudante>('Estudante')
      .update(updateEstudanteDto)
      .where({ ID: id })
      .returning('*');
    return estudante as Estudante;
  }

  async remove(id: number): Promise<void> {
    await this.knex<Estudante>('Estudante').where({ ID: id }).del();
  }

  async findByEmail(email: string): Promise<Estudante> {
    const [estudante] = await this.knex<Estudante>('Estudante')
      .select('*')
      .where({ Email: email });
    return estudante as Estudante;
  }
}
