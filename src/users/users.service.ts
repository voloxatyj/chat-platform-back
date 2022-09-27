import { Injectable } from '@nestjs/common';
import { CreateUserDetails } from 'src/utils/types';
import { IUserService } from './utils/users';

@Injectable()
export class UsersService implements IUserService {
  createUser(userDetails: CreateUserDetails) {
    console.log('UsersService.createUser');
  }
}
