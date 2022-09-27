import { Controller, Inject } from '@nestjs/common';
import { IAuthService } from './auth';
import { Routes, Services } from './utils/types';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}
}
