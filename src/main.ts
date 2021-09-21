import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'; // 1

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server'); // 2
  const port = serverConfig.port; // 3

  // Global Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // const port = 3000;
  await app.listen(port);

  Logger.log(`Application running on port ${port}`);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
