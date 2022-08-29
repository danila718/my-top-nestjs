import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Review {
  // _id: string;
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;
}
export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
