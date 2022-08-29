import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private readonly review: Model<ReviewDocument>) {}

  create(createdReviewDto: CreateReviewDto): Promise<Review> {
    const createdReview = new this.review(createdReviewDto);
    return createdReview.save();
  }

  delete(id: string): Promise<Review | null> {
    return this.review.findByIdAndDelete(id).exec();
  }

  findByProductId(productId: string): Promise<Review[]> {
    return this.review.find({ product: new Types.ObjectId(productId) }).exec();
  }
}
