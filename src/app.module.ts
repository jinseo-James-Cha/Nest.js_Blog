/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    BoardsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
