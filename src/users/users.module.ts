import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Services } from 'src/utils/constants';
import { UserEntity } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
})
export class UsersModule {}
