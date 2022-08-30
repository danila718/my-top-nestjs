import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminDto } from './dto/admin-dto';

@Controller('admin')
export class AdminController {
  @Post('register')
  async register(@Body() dto: AdminDto): Promise<void> {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AdminDto): Promise<void> {}
}
