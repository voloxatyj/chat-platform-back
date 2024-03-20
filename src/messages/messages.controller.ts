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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SkipThrottle } from '@nestjs/throttler';
import { Response } from 'express';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { UserEntity } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { EmptyMessageException } from './exceptions/EmptyMessageException';
import { IMessageService } from './messages';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES)
    private readonly messagesService: IMessageService,
    private eventEmitter: EventEmitter2,
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

    const response = await this.messagesService.createMessage(params);

    this.eventEmitter.emit('message.create', response);

    return res.sendStatus(HttpStatus.CREATED);
  }
}
