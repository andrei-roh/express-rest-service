import {
  Request,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { LoginService } from 'src/resources/login/login.service';
import { LocalGuard } from 'src/resources/login/local.guard';
import { Filter } from 'src/middlewares/filter';

@UseFilters(Filter)
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UseGuards(LocalGuard)
  @HttpCode(200)
  async login(@Request() request) {
    return this.loginService.login(request.user);
  }
}
