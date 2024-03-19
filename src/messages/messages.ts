import { MessageEntity } from '../utils/typeorm';
import {
  CreateMessageParams,
  CreateMessageResponse,
  DeleteMessageParams,
  EditMessageParams,
} from '../utils/types';

export interface IMessageService {
  createMessage(params: CreateMessageParams): Promise<CreateMessageResponse>;
  getMessages(id: number): Promise<MessageEntity[]>;
  deleteMessage(params: DeleteMessageParams);
  editMessage(params: EditMessageParams): Promise<MessageEntity>;
}
