import { UserEntity } from '../utils/typeorm';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<UserEntity | null>;
}
