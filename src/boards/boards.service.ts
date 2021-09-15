import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

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

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board'); //

    query.where('board.userId = :userId', { userId: user.id });

    // const boards = await this.boardRepository.find();
    const boards = await query.getMany();

    if (!boards) {
      throw new NotFoundException(`There is no boards in DB`);
    }

    return boards;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const board = await this.getBoardById(id);

    board.title = updateBoardDto.title;
    board.description = updateBoardDto.description;
    board.status = updateBoardDto.status;

    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const board = await this.boardRepository.delete(id);

    if (board.affected === 0) {
      throw new NotFoundException(`cannot find id Board with ${id}`);
    }

    console.log(board);
  }
}
