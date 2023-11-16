import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { loginDto } from './dto/login.dto';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { InjectConnection } from 'nest-knexjs';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class EstudantesService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly jwtService: JwtService,
  ) {
    this.knex = knex;
  }

  async create(createEstudanteDto: CreateEstudanteDto) {
    if (!createEstudanteDto.nome) {
      throw new BadRequestException('Nome é obrigatório');
    }

    const query = `
      INSERT INTO estudante (nome, email, matricula, curso, senha, admin)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      createEstudanteDto.nome,
      createEstudanteDto.email,
      createEstudanteDto.matricula,
      createEstudanteDto.curso,
      createEstudanteDto.senha,
      createEstudanteDto.admin,
    ];

    return await this.knex.raw(query, values);
  }

  async findByEmail(email: string) {
    const query = `SELECT * FROM estudante WHERE email = ?`;
    const result = await this.knex.raw(query, [email]);

    if (result[0]?.length) {
      return result[0][0];
    }

    return null;
  }

  async validatePassword(email: string, senha: string) {
    const estudante = await this.findByEmail(email);

    if (estudante && estudante.senha === senha) {
      return estudante;
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(email: string, senha: string) {
    const estudante = await this.validatePassword(email, senha);

    const payload = { email: estudante.email, sub: estudante.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async findAll() {
    const query = `SELECT * FROM Estudante`;
    return await this.knex.raw(query);
  }

  async findOne(id: number) {
    const query = `SELECT * FROM Estudante WHERE ID = ?`;
    return await this.knex.raw(query, [id]);
  }

  async update(id: number, updateEstudanteDto: UpdateEstudanteDto) {
    const query = `
      UPDATE Estudante
      SET Nome = ?, Email = ?, Matricula = ?, Curso = ?, Senha = ?, Admin = ?
      WHERE ID = ?
    `;
    const values = [
      updateEstudanteDto.nome,
      updateEstudanteDto.email,
      updateEstudanteDto.matricula,
      updateEstudanteDto.curso,
      updateEstudanteDto.senha,
      updateEstudanteDto.admin,
      id,
    ];

    return await this.knex.raw(query, values);
  }

  async remove(id: number) {
    const query = `DELETE FROM Estudante WHERE ID = ?`;
    const result = await this.knex.raw(query, [id]);

    if (result[0].affectedRows > 0) {
      return { success: true };
    }

    throw new NotFoundException('Estudante não encontrado');
  }
}
