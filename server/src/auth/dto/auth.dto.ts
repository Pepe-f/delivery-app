import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password mus be at least 6 characters long',
  })
  password: string;
}
