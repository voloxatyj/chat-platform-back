import { Injectable } from '@nestjs/common';
import { IParticipantsService } from './participants';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantEntity } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { FindParticipantParams } from 'src/utils/types';

@Injectable()
export class ParticipantsService implements IParticipantsService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly partcipantsRepository: Repository<ParticipantEntity>,
  ) {}
  findParticipant({
    id,
  }: FindParticipantParams): Promise<ParticipantEntity | null> {
    return this.partcipantsRepository.query(
      `SELECT * FROM "participants" WHERE id = ${id}`,
    );
  }
  findOrCreateParticipant(): Promise<ParticipantEntity> {
    throw new Error('Method not implemented.');
  }
  createParticipant(): Promise<ParticipantEntity> {
    throw new Error('Method not implemented.');
  }
}
