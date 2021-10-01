/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    BoardsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { 
    // The configure() method can be made asynchronous using async/await 
    // (e.g., you can await completion of an asynchronous operation inside the configure() method body).
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'boards', method: RequestMethod.POST },
        'boards/(.*)',
      )
      .forRoutes('boards');
      // .forRoutes({ path: 'boards', method: RequestMethod.GET });
      // .forRoutes(BoardController);
      // urther restrict a middleware to a particular request method by passing an object 
      // containing the route path and request method to the forRoutes() method
  }
}
