import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  providers: [AdminService],
})
export class AdminModule {}
