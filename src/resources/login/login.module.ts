import { Module, Logger } from '@nestjs/common';
import { UsersModule } from '../users/user.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginStrategy } from './login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: +process.env.JWT_TIME },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, LoginStrategy, JwtStrategy, Logger],
  exports: [LoginService],
})
export class LoginModule {}
