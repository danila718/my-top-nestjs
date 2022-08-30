import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from './dto/admin-dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private readonly admin: Model<AdminDocument>) {}

  async createUser(adminDto: AdminDto): Promise<AdminDocument | null> {
    const existAdmin = await this.findUser(adminDto.login);
    if (existAdmin) {
      return null;
    }
    const newAdmin = new this.admin({
      email: adminDto.login,
      passwordHash: await hash(adminDto.password, await genSalt(10)),
    });

    return newAdmin.save();
  }

  async findUser(email: string): Promise<AdminDocument | null> {
    return this.admin.findOne({ email: email }).exec();
  }
}
