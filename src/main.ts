import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { hookLogger, winstonLogger } from './logger/winston.logger';
import { functionalLogger } from './middleware/logger.middleware';
import * as helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = serverConfig.port;

  app.use(helmet.hidePoweredBy());
  // app.use(helmet());
  app.use(functionalLogger);

  // Global Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);

  // Logger.log(`Application running on port ${port}`);
  // logger.log(`Application running on port ${port}`);

  // winstonLogger.log('warn', `Application running on port ${port}`);
  // winstonLogger.error(`Application running on port ${port}`);
  // winstonLogger.info(`Application running on port ${port}`);
  // winstonLogger.silly(`Application running on port ${port}`);
}
bootstrap();
