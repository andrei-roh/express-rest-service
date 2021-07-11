import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  ParseUUIDPipe,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreate } from './board.create';
import { BoardUpdate } from './board.update';
import { Filter } from '../../middlewares/filter';
import { LoginGuard } from '../login/login.guard';

@Controller('boards')
@UseFilters(Filter)
@UseGuards(LoginGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getAll() {
    return await this.boardService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.isBoard(id);
  }

  @Post()
  async create(@Body() boardCreate: BoardCreate) {
    return await this.boardService.create(boardCreate);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() boardUpdate: BoardUpdate) {
    await this.isBoard(id);
    return await this.boardService.update(id, boardUpdate);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.isBoard(id);
    return await this.boardService.deleteBoard(id);
  }

  async isBoard(id: string) {
    const board = await this.boardService.getBoard(id);
    if (!board) throw new NotFoundException();
    return board;
  }
}
