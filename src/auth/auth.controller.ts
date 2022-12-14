import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Next,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { IUserService } from 'src/users/interfaces/user';
import { IAuthService } from './auth';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { Routes, Services } from '../utils/constants';
import { instanceToPlain } from 'class-transformer';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';
import { UserLoginDTO } from './dtos/UserLogin.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private usersService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDTO) {
    return instanceToPlain(await this.usersService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return req.session;
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
  }

  @Post('logout')
  logoutUser() {}
}
