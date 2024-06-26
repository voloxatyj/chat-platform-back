import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { getRepository } from 'typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SessionEntity } from './utils/typeorm/entities/Session';

async function bootstrap() {
  const { PORT, COOKIE_SECRET, ENVIRONMENT } = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger();
  const sessionRepository = getRepository(SessionEntity);

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => {
      logger.log(`

                  ################################################
                      🚀[server]: Server listening on port: ${PORT}
                  ################################################
                      
                  ################################################
                      🚀[mode]: Running in ${ENVIRONMENT} mode
                  ################################################
      `);
    });
  } catch (err) {
    logger.error(err);
  }
}
bootstrap();
