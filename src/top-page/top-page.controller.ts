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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import { TopPageDocument } from './schemas/top-page.schema';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.messages';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body(new ValidationPipe()) createTopPageDto: CreateTopPageDto,
  ): Promise<TopPageDocument> {
    return this.topPageService.create(createTopPageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  async getById(@Param('id', IdValidationPipe) id: string): Promise<TopPageDocument> {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
    return topPage;
  }

  @Get(':alias')
  async getByAlias(@Param('alias') alias: string): Promise<TopPageDocument> {
    const topPage = await this.topPageService.findByAlias(alias);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
    const deletedTopPage = await this.topPageService.deleteById(id);
    if (!deletedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateTopPageDto: UpdateTopPageDto,
  ): Promise<TopPageDocument> {
    const updatedTopPage = await this.topPageService.updateById(id, updateTopPageDto);
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
    return updatedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find-menu')
  async findByFirstCategory(@Body() findTopPageDto: FindTopPageDto) {
    return this.topPageService.findByFirstCategory(findTopPageDto);
  }
}
