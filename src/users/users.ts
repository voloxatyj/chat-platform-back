import { UserEntity } from '../utils/typeorm';
import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types';

export interface IUsersService {
  createUser(userDetails: CreateUserDetails): Promise<UserEntity>;
  findUser(
    findUserParams: FindUserParams,
    options?: FindUserOptions,
  ): Promise<UserEntity>;
}
