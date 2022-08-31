import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { compare, genSalt, hash } from 'bcryptjs';
import { ERROR_ADMIN_INVALID_PASSWORD, ERROR_ADMIN_NOT_FOUND } from './admin.messages';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly admin: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(email: string, password: string): Promise<AdminDocument | null> {
    const existAdmin = await this.findUser(email);
    if (existAdmin) {
      return null;
    }
    const newAdmin = new this.admin({
      email,
      passwordHash: await hash(password, await genSalt(10)),
    });

    return newAdmin.save();
  }

  async findUser(email: string): Promise<AdminDocument | null> {
    return this.admin.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<Admin, 'email'>> {
    const existAdmin = await this.findUser(email);
    if (!existAdmin) {
      throw new UnauthorizedException(ERROR_ADMIN_NOT_FOUND);
    }

    const isValidPassword = await compare(password, existAdmin.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedException(ERROR_ADMIN_INVALID_PASSWORD);
    }
    return { email: existAdmin.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
