import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
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
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('JamesBoardsController');

  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  @UseInterceptors(TransformInterceptor)
  getBoardById(@Param('id') id: number, @GetUser() user: User): Promise<Board> {
    return this.boardsService.getBoardById(id, user);
  }

  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    // boardLogger.info(
    //   `In ${BoardsController.name} User ${user.username} trying to get all boards`,
    // );

    // hookLogger.info(
    //   `In ${BoardsController.name} User ${user.username} trying to get all boards`,
    // );

    // this.logger.log(`User ${user.username} trying to get all boards`);
    // this.logger.error(`User ${user.username} trying to get all boards`);
    // this.logger.warn(`User ${user.username} trying to get all boards`);
    // this.logger.debug(`User ${user.username} trying to get all boards`);
    // this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  @Post()
  @Roles(Role.Admin) // @SetMetadata('roles', ['Admin']) // @Roles(Role.Admin, Role.Sales)
  @UseGuards(RolesGuard)
  createBoard(
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
