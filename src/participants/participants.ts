import { ParticipantEntity } from 'src/utils/typeorm';
import {
  CreateParticipantParams,
  FindParticipantParams,
} from 'src/utils/types';

export interface IParticipantsService {
  findParticipant(
    params: FindParticipantParams,
  ): Promise<ParticipantEntity | null>;
  findOrCreateParticipant();
  createParticipant({
    id,
  }: CreateParticipantParams): Promise<ParticipantEntity>;
}
