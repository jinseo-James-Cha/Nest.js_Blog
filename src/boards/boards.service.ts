import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`can't find Board with id ${id}`);
    }

    return found;
  }

  async getAllBoards(): Promise<Board[]> {
    const boards = await this.boardRepository.find();

    if (!boards) {
      throw new NotFoundException(`There is no boards in DB`);
    }

    return boards;
  }
}
