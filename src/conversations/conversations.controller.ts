import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationsService } from './conversations';
import { createConversationDto } from './dtos/CreateConversation.dto';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Post()
  createConversation(
    @Body() { authorId, recipientId, message }: createConversationDto,
  ) {
    this.conversationsService.createConversation({
      authorId,
      recipientId,
      message,
    });
  }
}
