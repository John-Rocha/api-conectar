import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from 'generated/prisma';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signIn(body);
  }
}
