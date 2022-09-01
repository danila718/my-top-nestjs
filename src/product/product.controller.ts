import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_ERROR_NOT_FOUND } from './product.messages';
import { ProductService } from './product.service';
import { ProductDocument } from './schemas/product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string): Promise<ProductDocument> {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_ERROR_NOT_FOUND);
    }
    return product;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
    const deletedProduct = await this.productService.deleteById(id);
    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_ERROR_NOT_FOUND);
    }
    // return deletedProduct;
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const updatedProduct = await this.productService.updateById(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_ERROR_NOT_FOUND);
    }
    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() findProductDto: FindProductDto) {
    return this.productService.findWithReviews(findProductDto);
  }
}
