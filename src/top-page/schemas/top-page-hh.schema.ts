import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timestamps } from '../../common/schemas/timestamps.schema';

@Schema({ timestamps: true })
export class TopPageHh extends Timestamps {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export type TopPageHhDocument = TopPageHh & Document;

export const TopPageHhSchema = SchemaFactory.createForClass(TopPageHh);
