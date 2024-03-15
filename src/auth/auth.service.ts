import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compareHash } from 'src/helpers/password';
import { IUsersService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { UserEntity } from 'src/utils/typeorm/entities/User';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    try {
      const user = await this.usersService.findUser(
        { email },
        { selectAll: true },
      );

      const isPasswordValid = await compareHash(password, user.password);

      if (!isPasswordValid) throw new UnauthorizedException();

      return user;
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
