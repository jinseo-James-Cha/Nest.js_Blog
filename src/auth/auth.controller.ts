import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CachingInterceptor } from 'src/interceptors/caching.interceptor';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(CachingInterceptor)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @UseInterceptors(LoggingInterceptor)
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseInterceptors(TimeoutInterceptor)
  test(@Req() req) {
    console.log(req);
  }

  @Post('/testCustom')
  @UseGuards(AuthGuard())
  testCustomDecorator(@GetUser() user: User) {
    console.log('user', user);
  }

  @Get('/users')
  getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }
}
