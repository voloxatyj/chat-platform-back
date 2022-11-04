import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(3)
  last_name: string;

  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  user_name: string;
}
