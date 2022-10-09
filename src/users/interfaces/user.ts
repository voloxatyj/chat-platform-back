import { User } from '../../utils/typeorm';
import { CreateUserDetails } from 'src/utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
}
