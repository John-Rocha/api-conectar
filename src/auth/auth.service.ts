import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwtService: JwtService;

  async signIn(
    params: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
