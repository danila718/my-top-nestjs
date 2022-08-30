import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export type TopPageAdvantageDocument = TopPageAdvantage & Document;

export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);
