import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { ERROR_ADMIN_EXIST, ERROR_ADMIN_LOGIN } from './admin.messages';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin-dto';
import { AdminDocument } from './schemas/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() adminDto: AdminDto): Promise<AdminDocument> {
    const res = await this.adminService.createUser(adminDto);
    if (!res) {
      throw new BadRequestException(ERROR_ADMIN_EXIST);
    }
    return res;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() adminDto: AdminDto): Promise<{ token: string }> {
    const res = await this.adminService.validateUser(adminDto);
    if (!res) {
      throw new BadRequestException(ERROR_ADMIN_LOGIN);
    }
    const jwt = await this.adminService.login(adminDto.login);
    return { token: jwt };
  }
}
