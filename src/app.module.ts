import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma.service';
@Module({
  imports: [AuthModule, UserModule, DatabaseModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, PrismaService],
})
export class AppModule {}
