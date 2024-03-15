import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/password';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/utils/typeorm';
import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types';
import { IUsersService } from './users';

@Injectable()
export class UserService implements IUsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser({
    email,
    password,
    first_name,
    last_name,
    user_name,
  }: CreateUserDetails) {
    try {
      const [userExist] = await this.userRepository.query(
        `SELECT * FROM users WHERE email="${email}" OR user_name="${user_name}" ORDER BY created_at`,
      );

      if (userExist) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const hashed_password = await hashPassword(password);
      const newUser = await this.userRepository.create({
        email,
        first_name,
        last_name,
        user_name,
        password: hashed_password,
      });

      return new UserEntity(await this.userRepository.save(newUser));
    } catch (error) {
      throw new HttpException(
        'Houston, we have a problem, credentials matching',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findUser(
    params: FindUserParams,
    options?: FindUserOptions,
  ): Promise<UserEntity> {
    const selections: (keyof UserEntity)[] = [
      'email',
      'user_name',
      'first_name',
      'last_name',
      'id',
    ];
    const selectionsWithPassword: (keyof UserEntity)[] = [
      ...selections,
      'password',
    ];
    return this.userRepository.findOne(params, {
      select: options?.selectAll ? selectionsWithPassword : selections,
      relations: [],
    });
  }
}
