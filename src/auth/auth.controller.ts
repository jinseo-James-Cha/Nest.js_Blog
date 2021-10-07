import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  RequestTimeoutException,
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

  timeoutTest(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @Post('/test')
  @UseInterceptors(TimeoutInterceptor)
  async test() {
    await this.timeoutTest(6000);
    console.log('asynchronous Route Handler done.');
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
