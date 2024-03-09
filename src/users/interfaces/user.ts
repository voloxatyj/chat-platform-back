import { UserEntity } from '../../utils/typeorm';
import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from '../../utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<UserEntity>;
  findUser(
    findUserParams: FindUserParams,
    options?: FindUserOptions,
  ): Promise<UserEntity>;
}
