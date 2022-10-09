import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { IUserService } from 'src/users/interfaces/user';
import { IAuthService } from './auth';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { Routes, Services } from '../utils/constants';
import { instanceToPlain } from 'class-transformer';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private usersService: IUserService,
  ) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDTO) {
    return instanceToPlain(this.usersService.createUser(createUserDto));
  }

  @Post('login')
  loginUser() {}

  @Get('status')
  statusUser() {}

  @Post('logout')
  logoutUser() {}
}
