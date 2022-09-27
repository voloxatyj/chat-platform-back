import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../users/utils/users';
import { IAuthService } from './auth';
import { Services } from '../utils/constants';

@Injectable()
export class AuthService implements IAuthService {
  validateUser() {}
}
