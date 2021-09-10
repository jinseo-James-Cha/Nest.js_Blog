import { IsNotEmpty, IsOptional } from 'class-validator';
import { BoardStatus } from '../board-status.enum';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  readonly status: BoardStatus = BoardStatus.PUBLIC;
}
