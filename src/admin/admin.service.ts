import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from './dto/admin-dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly admin: Model<AdminDocument>,
    private readonly configServce: ConfigService,
  ) {}

  async createUser({ login, password }: AdminDto): Promise<AdminDocument | null> {
    const existAdmin = await this.findUser(login);
    if (existAdmin) {
      return null;
    }
    const newAdmin = new this.admin({
      email: login,
      passwordHash: await hash(password, await genSalt(10)),
    });

    return newAdmin.save();
  }

  async findUser(email: string): Promise<AdminDocument | null> {
    return this.admin.findOne({ email: email }).exec();
  }

  async validateUser({ login, password }: AdminDto): Promise<boolean> {
    const existAdmin = await this.findUser(login);
    if (!existAdmin) {
      return false;
    }

    return compare(password, existAdmin.passwordHash);
  }

  async login(email: string): Promise<string> {
    const secret = this.configServce.get('SECRET');
    if (!secret) {
      throw new InternalServerErrorException(`Can not get secret key`);
    }
    return new Promise<string>((resolve, reject) => {
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, jwt) => {
          if (err) {
            reject(err);
          }
          resolve(jwt as string);
        },
      );
    });
  }
}
