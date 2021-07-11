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
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from 'src/resources/boards/board.service';
import { BoardCreate } from 'src/resources/boards/board.create';
import { BoardUpdate } from 'src/resources/boards/board.update';
import { Filter } from 'src/middlewares/filter';
import { LoginGuard } from 'src/resources/login/login.guard';

@Controller('boards')
@UseFilters(Filter)
@UseGuards(LoginGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAll() {
    return await this.boardsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.isBoard(id);
  }

  @Post()
  async create(@Body() boardCreate: BoardCreate) {
    return await this.boardsService.create(boardCreate);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() boardUpdate: BoardUpdate,
  ) {
    await this.isBoard(id);
    return await this.boardsService.update(id, boardUpdate);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.isBoard(id);
    return await this.boardsService.deleteBoard(id);
  }

  async isBoard(id: string) {
    const board = await this.boardsService.getBoard(id);
    if (!board) throw new NotFoundException();
    return board;
  }
}
