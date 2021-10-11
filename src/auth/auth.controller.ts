import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  RequestTimeoutException,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExceptionClassBindingFilter } from 'src/filters/exception-class-binding.filter.ts.filter';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CachingInterceptor } from 'src/interceptors/caching.interceptor';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@UseFilters(ExceptionClassBindingFilter)
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
  @UseFilters(HttpExceptionFilter)
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  timeoutTest(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @Get('/testTimeout')
  @UseInterceptors(TimeoutInterceptor)
  async testTimeout() {
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
