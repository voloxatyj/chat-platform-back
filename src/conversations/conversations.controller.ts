import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { IParticipantsService } from 'src/participants/participants';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound';
import { IUsersService } from 'src/users/users';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { UserEntity } from 'src/utils/typeorm';
import { IConversationsService } from './conversations';
import { createConversationDto } from './dtos/CreateConversation.dto';
import { ConversationExistsException } from './exceptions/ConversationExists';
import { CreateConversationException } from './exceptions/CreateConversation';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
    @Inject(Services.USERS)
    private readonly usersService: IUsersService,
    @Inject(Services.PARTICIPANTS)
    private readonly participantsService: IParticipantsService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() creator: UserEntity,
    @Body() { user_name, message: content }: createConversationDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const recipient = await this.usersService.findUser({ user_name });
    if (!recipient) throw new UserNotFoundException();
    if (creator.id === recipient.id)
      throw new CreateConversationException(
        'Cannot create Conversation with yourself',
      );
    const exists = await this.conversationsService.isCreated(
      creator.id,
      recipient.id,
    );
    if (exists) throw new ConversationExistsException();

    await this.conversationsService.createConversation(creator, {
      recipient,
      content,
    });

    return res.sendStatus(HttpStatus.CREATED);
  }

  @Get()
  async getConversations(@AuthUser() { id }: UserEntity) {
    return this.conversationsService.getConversations(id);
  }

  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    return this.conversationsService.findById(id);
  }
}
