import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUsersService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { UserEntity } from 'src/utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS)
    private readonly usersService: IUsersService,
  ) {
    super();
  }
  serializeUser(
    { id }: UserEntity,
    done: (err: Error, { id }: Pick<UserEntity, 'id'>) => void,
  ) {
    done(null, { id });
  }
  async deserializeUser(
    { id }: UserEntity,
    done: (err: Error, { id }: Pick<UserEntity, 'id'>) => void,
  ) {
    const user = await this.usersService.findUser({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return done(null, user);
  }
}
