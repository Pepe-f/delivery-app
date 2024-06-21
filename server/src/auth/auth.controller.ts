import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('login/access-token')
  @UsePipes(new ValidationPipe())
  @Auth()
  async refreshTokens(@Body() dto: RefreshTokensDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
}
