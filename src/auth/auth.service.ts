import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../users/interfaces/user';
import { IAuthService } from './auth';
import { Services } from '../utils/constants';

@Injectable()
export class AuthService implements IAuthService {
  validateUser() {}
}
