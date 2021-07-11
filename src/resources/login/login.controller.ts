import {
  Request,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LocalGuard } from './local.guard';
import { Filter } from '../../middlewares/filter';

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
