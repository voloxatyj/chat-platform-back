import { IsNotEmpty, IsString } from 'class-validator';

export class createConversationDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
