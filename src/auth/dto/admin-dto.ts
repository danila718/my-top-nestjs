import { IsEmail, IsString } from 'class-validator';

export class AdminDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
