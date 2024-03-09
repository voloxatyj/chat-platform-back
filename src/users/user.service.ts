import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/password';
import { Repository } from 'typeorm';
import { UserEntity } from '../utils/typeorm';
import { CreateUserDetails, FindUserParams } from '../utils/types';
import { IUserService } from './interfaces/user';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    try {
      const userExist = await this.userRepository.findOne({
        email: userDetails.email,
      });

      if (userExist)
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      const password = await hashPassword(userDetails.password);
      const newUser = await this.userRepository.create({
        ...userDetails,
        password,
      });
      return this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(
        'Houston we have a problem',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findUser(params: FindUserParams): Promise<UserEntity> {
    return this.userRepository.findOne(params);
  }
}
