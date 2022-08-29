import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './review.model';

@Module({
  controllers: [ReviewController],
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
})
export class ReviewModule {}
