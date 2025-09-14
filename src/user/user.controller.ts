import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma, User as UserModel } from 'generated/prisma';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been found.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      required: ['id', 'email', 'createdAt', 'updatedAt'],
    },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findUser(
    @Param('id') id: string,
  ): Promise<Omit<UserModel, 'password'> | null> {
    return this.userService.findUser({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        name: { type: 'string', nullable: true },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      required: ['id', 'email', 'createdAt', 'updatedAt'],
    },
  })
  async createUser(
    @Body()
    data: Prisma.UserCreateInput,
  ): Promise<Omit<UserModel, 'password'>> {
    return this.userService.createUser(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        name: { type: 'string', nullable: true },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      required: ['id', 'email', 'createdAt', 'updatedAt'],
    },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<Omit<UserModel, 'password'>> {
    return this.userService.updateUser({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso',
    schema: { type: 'string' },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async deleteUser(@Param('id') id: string): Promise<string> {
    return this.userService.deleteUser({ id });
  }
}
