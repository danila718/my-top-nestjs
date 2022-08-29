import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_ERROR_NOT_FOUND } from './review.messages';
import { Review } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string): Promise<Review[]> {
    return this.reviewService.findByProductId(productId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Review> {
    const deletedReview = await this.reviewService.delete(id);
    if (!deletedReview) {
      throw new HttpException(REVIEW_ERROR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deletedReview;
  }
}
