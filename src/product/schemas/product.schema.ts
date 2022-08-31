import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Timestamps } from '../../common/schemas/timestamps.schema';
import {
  ProductCharacteristic,
  ProductCharacteristicSchema,
} from './product-characteristic.schema';

@Schema({ timestamps: true })
export class Product extends Timestamps {
  // _id: string;
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disAdvandages: string;

  @Prop([String])
  categories: string[];

  @Prop([String])
  tags: string[];

  @Prop({ type: [ProductCharacteristicSchema], _id: false })
  characteristics: ProductCharacteristic[];
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
