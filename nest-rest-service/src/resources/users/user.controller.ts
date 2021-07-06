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
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreate } from './user.create';
import { UserUpdate } from './user.update';
import { User } from './user.model';
import { Filter } from '../../middlewares/filter';
import { LoginGuard } from '../login/login.guard';

@Controller('user')
@UseFilters(Filter)
@UseGuards(LoginGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return users.map(User.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.isUser(id);
    return User.toResponse(user);
  }

  @Post()
  async create(@Body() UserCreate: UserCreate) {
    const user = await this.userService.create(UserCreate);
    return User.toResponse(user);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() UserUpdate: UserUpdate) {
    await this.isUser(id);
    const user = await this.userService.update(id, UserUpdate);
    return User.toResponse(user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.isUser(id);
    return await this.userService.deleteUser(id);
  }

  async isUser(id: string) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
