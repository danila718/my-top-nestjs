import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_ERROR_NOT_FOUND } from './review.messages';
import { ReviewService } from './review.service';
import { Review, ReviewDocument } from './schemas/review.schema';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() createReviewDto: CreateReviewDto): Promise<ReviewDocument> {
    return this.reviewService.create(createReviewDto);
  }

  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId', IdValidationPipe) productId: string,
  ): Promise<ReviewDocument[]> {
    return this.reviewService.findByProductId(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
    const deletedReview = await this.reviewService.delete(id);
    if (!deletedReview) {
      throw new HttpException(REVIEW_ERROR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    // return deletedReview;
  }
}
