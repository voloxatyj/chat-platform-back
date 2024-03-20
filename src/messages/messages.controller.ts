import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { UserEntity } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { EmptyMessageException } from './exceptions/EmptyMessageException';
import { IMessageService } from './messages';
import { SkipThrottle } from '@nestjs/throttler';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES)
    private readonly messagesService: IMessageService,
  ) {}

  @Get(':conversationId')
  @SkipThrottle()
  async MessagesFromConversation(
    @Param('conversationId', ParseIntPipe) conversationId: number,
  ) {
    const messages = await this.messagesService.getMessages(conversationId);
    return { conversationId, messages };
  }

  @Post(':id')
  async createMessage(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body()
    { content }: CreateMessageDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    if (!content) throw new EmptyMessageException();

    const params = { user, id, content };

    await this.messagesService.createMessage(params);

    return res.sendStatus(HttpStatus.CREATED);
  }
}
