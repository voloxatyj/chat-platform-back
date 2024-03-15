import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationsService } from './conversations';
import { createConversationDto } from './dtos/CreateConversation.dto';
import { AuthUser } from 'src/utils/decorators';
import { ConversationEntity, UserEntity } from 'src/utils/typeorm';
import { IUsersService } from 'src/users/users';
import { IParticipantsService } from 'src/participants/participants';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound';
import { CreateConversationException } from './exceptions/CreateConversation';
import { ConversationExistsException } from './exceptions/ConversationExistsException';

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
  ): Promise<ConversationEntity> {
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

    const conversation: ConversationEntity =
      await this.conversationsService.createConversation(creator, {
        recipient,
        content,
      });

    return conversation;
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
