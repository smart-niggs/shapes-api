import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { USER_HEADERS } from 'src/common/constants';
import { UserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
@ApiTags('Auth')
@ApiHeaders(USER_HEADERS)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(new ValidationPipe()) userCred: UserDto) {
    return this.authService.login(userCred);
  }

  @Post('sign-up')
  async signUp(@Body(new ValidationPipe()) newUser: UserDto) {
    return this.authService.signUp(newUser);
  }
}
