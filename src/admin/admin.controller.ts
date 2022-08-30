import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ERROR_ADMIN_EXIST } from './admin.messages';
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
  async login(@Body() dto: AdminDto): Promise<void> {}
}
