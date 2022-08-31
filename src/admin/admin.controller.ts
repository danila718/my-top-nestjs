import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ERROR_ADMIN_EXIST, ERROR_ADMIN_LOGIN } from './admin.messages';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin-dto';
import { AdminDocument } from './schemas/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() { email, password }: AdminDto): Promise<AdminDocument> {
    const res = await this.adminService.createUser(email, password);
    if (!res) {
      throw new BadRequestException(ERROR_ADMIN_EXIST);
    }
    return res;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: AdminDto): Promise<{ access_token: string }> {
    const validAdminEmail = await this.adminService.validateUser(email, password);
    return this.adminService.login(email);
  }
}
