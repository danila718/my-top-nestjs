import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Timestamps } from '../../common/schemas/timestamps.schema';
import { TopPageAdvantage, TopPageAdvantageSchema } from './top-page-advantage.schema';
import { TopPageHh, TopPageHhSchema } from './top-page-hh.schema';

export enum TopLevelCategory {
  Courses = 1,
  Services,
  Books,
  Products,
}

@Schema({ timestamps: true })
export class TopPage extends Timestamps {
  // _id: string;
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: TopPageHhSchema, _id: false })
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
// TopPageSchema.index({ title: 'text', seoText: 'text' });
TopPageSchema.index({ '$**': 'text' });
