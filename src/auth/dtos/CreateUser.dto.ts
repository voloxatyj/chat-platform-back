import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(8)
  password: string;
}
