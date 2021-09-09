import { PartialType } from '@nestjs/mapped-types';
import { Board } from '../board.entity';

export class UpdateBoardDto extends PartialType(Board) {}
