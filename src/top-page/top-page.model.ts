import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema({ timestamps: true })
export class TopPageHh {
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

@Schema({ timestamps: true })
export class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}
export type TopPageAdvantageDocument = TopPageAdvantage & Document;
export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);

@Schema({ timestamps: true })
export class TopPage {
  // _id: string;
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: TopPageAdvantageSchema, _id: false })
  hh?: TopPageHh;

  @Prop({ type: [TopPageAdvantageSchema], _id: false })
  advantages: TopPageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: [String] })
  tags: string[];
}
export type TopPageDocument = TopPage & Document;
export const TopPageSchema = SchemaFactory.createForClass(TopPage);
