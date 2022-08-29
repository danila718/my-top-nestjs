import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseModel } from '../common/base.model';
import { Product } from '../product/product.model';

@Schema({ timestamps: true })
export class Review extends BaseModel {
  // _id: string;
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: Types.ObjectId, ref: Product.name })
  product: Product;
}
export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
