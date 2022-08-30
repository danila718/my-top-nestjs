import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { Product } from './schemas/product.schema';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<Product, '_id'>): Promise<void> {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<void> {}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Product): Promise<void> {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto): Promise<void> {}
}
