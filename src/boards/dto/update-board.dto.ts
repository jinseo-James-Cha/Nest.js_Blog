import { PartialType } from '@nestjs/mapped-types';
import { Board } from '../board.entity';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(Board) {}
