import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = AuthCredentialsDto;
    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
