import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../users/interfaces/user';
import { IAuthService } from './auth';
import { Services } from '../utils/constants';
import { compareHash } from '../helpers/password';
import { ValidateUserDetails } from '../utils/types';
import { UserEntity } from '../utils/typeorm/entities/User';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private userService: IUserService) {}

  async validateUser(userCredentials): Promise<UserEntity | null> {
    const { email, password } = userCredentials;

    const user = await this.userService.findUser(
      { email },
      { selectAll: true },
    );

    const isPasswordValid = await compareHash(password, user.password);

    return isPasswordValid ? user : null;
  }
}
