import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  async signIn(
    params: Prisma.UserCreateInput,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Credenciais inválidas');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = user;
    return safe;
  }
}
