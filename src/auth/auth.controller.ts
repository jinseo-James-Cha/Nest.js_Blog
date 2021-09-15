import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // 인증에 미들웨어 처리. 토큰체크, 401 에러발생.
  test(@Req() req) {
    console.log('log', req);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // 인증에 미들웨어 처리. 토큰체크, 401 에러발생.
  testCustomDecorator(@GetUser() user: User) {
    console.log('user', user);
  }
}
