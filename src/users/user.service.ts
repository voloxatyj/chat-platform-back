import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../utils/typeorm';
import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from '../utils/types';
import { IUserService } from './interfaces/user';
import { hashPassword } from 'src/helpers/password';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDetails: CreateUserDetails) {
    const userExist = await this.userRepository.findOneBy({
      email: userDetails.email,
    });
    if (userExist)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
    });
    return this.userRepository.save(newUser);
  }

  async findUser(params: FindUserParams): Promise<User> {
    return this.userRepository.findOneBy(params);
  }
}
