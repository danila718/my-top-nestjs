import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timestamps } from '../../common/schemas/timestamps.schema';

@Schema({ timestamps: true })
export class ProductCharacteristic extends Timestamps {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

export type ProductCharacteristicDocument = ProductCharacteristic & Document;

export const ProductCharacteristicSchema = SchemaFactory.createForClass(ProductCharacteristic);
