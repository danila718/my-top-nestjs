import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Timestamps } from '../../common/schemas/timestamps.schema';
import { Product } from '../../product/schemas/product.schema';

@Schema({ timestamps: true })
export class Review extends Timestamps {
  // _id: string;
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name })
  product: Product;
}

export type ReviewDocument = Review & Document;

export const ReviewSchema = SchemaFactory.createForClass(Review);
