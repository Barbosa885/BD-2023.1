import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EstudanteService } from '../estudante/estudante.service';
import { Estudante } from '../estudante/entities/estudante.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly estudanteService: EstudanteService,
  ) {}

  async validateUser(email: string, senha: string): Promise<Estudante> {
    const estudante = await this.estudanteService.findByEmail(email);

    if (!estudante || estudante.Senha !== senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return estudante;
  }

  async login(estudante: Estudante) {
    const payload = { email: estudante.Email, sub: estudante.ID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
