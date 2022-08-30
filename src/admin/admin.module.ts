import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from './schemas/admin.schema';

@Module({
  controllers: [AdminController],
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
})
export class AdminModule {}
