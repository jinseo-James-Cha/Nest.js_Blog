import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { boardLogger, hookLogger } from 'src/logger/winston.logger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  @UseInterceptors(TransformInterceptor)
  getBoardById(@Param('id') id: number, @GetUser() user: User): Promise<Board> {
    return this.boardsService.getBoardById(id, user);
  }

  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    // hookLogger.info(
    //   `In ${BoardsController.name} User ${user.username} trying to get all boards`,
    // );

    return this.boardsService.getAllBoards(user);
  }

  @Post()
  @Roles(Role.Admin) // @SetMetadata('roles', ['Admin']) // @Roles(Role.Admin, Role.Sales)
  @UseGuards(RolesGuard)
  createBoard(
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Put('/:id')
  updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.updateBoard(id, updateBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }
}
