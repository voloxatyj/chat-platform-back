import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compareHash } from '../helpers/password';
import { IUserService } from '../users/interfaces/user';
import { Services } from '../utils/constants';
import { UserEntity } from '../utils/typeorm/entities/User';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    try {
      const user = await this.userService.findUser(
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
