import { Module, Logger } from '@nestjs/common';
import { UsersModule } from 'src/resources/users/user.module';
import { LoginController } from 'src/resources/login/login.controller';
import { LoginService } from 'src/resources/login/login.service';
import { LoginStrategy } from 'src/resources/login/login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/resources/login/jwt.strategy';

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
