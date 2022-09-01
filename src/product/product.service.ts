import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument } from '../review/schemas/review.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly product: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product = new this.product(createProductDto);
    return product.save();
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.product.findById(id).exec();
  }

  async deleteById(id: string): Promise<ProductDocument | null> {
    return this.product.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument | null> {
    return this.product.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async findWithReviews(findProductDto: FindProductDto) {
    return (await this.product
      .aggregate([
        {
          $match: {
            categories: findProductDto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: findProductDto.limit,
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'product',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec()) as (ProductDocument & {
      review: ReviewDocument[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
