import { Controller, Inject } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IUsersService } from './users';

@Controller('users')
export class UserController {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
  ) {}
}
