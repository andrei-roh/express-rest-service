import {
  Request,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseFilters
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginGuard } from './login.guard';
import { Filter } from '../../middlewares/filter';

@UseFilters(Filter)
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UseGuards(LoginGuard)
  @HttpCode(200)
  async login(@Request() request) {
    return this.loginService.login(request.user);
  }
}
