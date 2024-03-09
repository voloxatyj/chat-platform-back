import { UserEntity } from '../utils/typeorm';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<UserEntity>;
  findUser(findUserParams: FindUserParams): Promise<UserEntity>;
}
