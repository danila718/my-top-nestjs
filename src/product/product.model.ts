import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ProductCharacteristic {
  @Prop()
  name: string;

  @Prop()
  value: string;
}
export type ProductCharacteristicDocument = ProductCharacteristic & Document;
export const ProductCharacteristicSchema = SchemaFactory.createForClass(ProductCharacteristic);

@Schema({ timestamps: true })
export class Product {
  // _id: string;
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice: number;

  @Prop()
  credit: number;

  @Prop()
  calculatedRating: number;

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

  @Prop({ type: [ProductCharacteristicSchema] })
  characteristics: ProductCharacteristic[];
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
