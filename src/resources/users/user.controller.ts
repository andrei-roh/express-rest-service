import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  ParseUUIDPipe,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/resources/users/user.service';
import { UserCreate } from 'src/resources/users/user.create';
import { UserUpdate } from 'src/resources/users/user.update';
import { User } from 'src/resources/users/user.model';
import { Filter } from 'src/middlewares/filter';
import { LoginGuard } from 'src/resources/login/login.guard';

@Controller('users')
@UseFilters(Filter)
@UseGuards(LoginGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    const users = await this.usersService.getAll();
    return users.map(User.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.isUser(id);
    return User.toResponse(user);
  }

  @Post()
  async create(@Body() userCreate: UserCreate) {
    const user = await this.usersService.create(userCreate);
    return User.toResponse(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userUpdate: UserUpdate,
  ) {
    await this.isUser(id);
    const user = await this.usersService.update(id, userUpdate);
    return User.toResponse(user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.isUser(id);
    return await this.usersService.deleteUser(id);
  }

  async isUser(id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
