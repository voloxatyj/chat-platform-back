import { Controller, Inject } from '@nestjs/common';
import { Services } from '../utils/constants';
import { IUserService } from './interfaces/user';

@Controller('users')
export class UserController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
}
