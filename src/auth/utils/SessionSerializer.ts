import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from '../../users/interfaces/user';
import { Services } from '../../utils/constants';
import { UserEntity } from '../../utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
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
    const user = await this.userService.findUser({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return done(null, user);
  }
}
