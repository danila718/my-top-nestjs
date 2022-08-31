import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Timestamps } from '../../common/schemas/timestamps.schema';

@Schema({ timestamps: true })
export class Admin extends Timestamps {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin);
