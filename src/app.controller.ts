import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Filter } from 'src/middlewares/filter';

@UseFilters(Filter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
