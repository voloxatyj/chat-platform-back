import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../utils/typeorm';
import { CreateUserDetails } from 'src/utils/types';
import { IUserService } from './interfaces/user';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  createUser(userDetails: CreateUserDetails) {
    console.log('UsersService.createUser');
  }
}
