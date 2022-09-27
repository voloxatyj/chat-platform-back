import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { IAuthService } from './auth';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { Routes, Services } from './utils/types';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDTO) {}

  @Post('login')
  loginUser() {}

  @Get('status')
  statusUser() {}

  @Post('logout')
  logoutUser() {}
}
