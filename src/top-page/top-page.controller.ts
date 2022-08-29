import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPage } from './top-page.model';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPage, '_id'>): Promise<void> {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<void> {}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPage): Promise<void> {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto): Promise<void> {}
}
