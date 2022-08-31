import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ERROR_ADMIN_EXIST } from './auth.messages';
import { AuthService } from './auth.service';
import { AdminDto } from './dto/admin-dto';
import { AdminDocument } from './schemas/admin.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() { email, password }: AdminDto): Promise<AdminDocument> {
    const res = await this.authService.createUser(email, password);
    if (!res) {
      throw new BadRequestException(ERROR_ADMIN_EXIST);
    }
    return res;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: AdminDto): Promise<{ access_token: string }> {
    const validAdmin = await this.authService.validateUser(email, password);
    return this.authService.login(validAdmin.email);
  }
}
