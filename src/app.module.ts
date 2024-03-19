import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import entities from 'src/utils/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { ParticipantsModule } from './participants/participants.module';
import { MessagesModule } from './messages/messages.module';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  envFilePath = '.env.production';
} else if (process.env.ENVIRONMENT === 'STAGING') {
  envFilePath = '.env.staging';
}
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConversationsModule,
    ParticipantsModule,
    ConfigModule.forRoot({ envFilePath }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities,
      logging: false,
    }),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
