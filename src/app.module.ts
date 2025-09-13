import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
@Module({
  imports: [AuthModule, UserModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class AppModule {}
