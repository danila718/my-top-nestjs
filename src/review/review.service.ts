import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private readonly review: Model<ReviewDocument>) {}

  async create(createdReviewDto: CreateReviewDto): Promise<ReviewDocument> {
    const createdReview = new this.review(createdReviewDto);
    return createdReview.save();
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return this.review.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewDocument[]> {
    return this.review.find({ product: new Types.ObjectId(productId) }).exec();
  }

  async deleteByProductId(productId: string): Promise<number> {
    const result = await this.review.deleteMany({ product: new Types.ObjectId(productId) }).exec();
    return result.deletedCount ?? 0;
  }
}
