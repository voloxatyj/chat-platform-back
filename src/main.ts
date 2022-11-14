import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { getRepository } from 'typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Session } from './utils/typeorm/entities/Session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  const sessionRepository = getRepository(Session);

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: configService.get('COOKIE_SECRET'),
      saveUninitialized: false,
      resave: false,
      name: 'sid',
      cookie: {
        sameSite: true,
        httpOnly: false,
        maxAge: 86400000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(configService.get('PORT'), () => {
      logger.log(`
                  ################################################
                      🚀[server]: Server listening on port: ${configService.get(
                        'PORT',
                      )}
                  ################################################
                      🚀[mode]: Running in ${configService.get(
                        'ENVIRONMENT',
                      )} mode
                  ################################################
      `);
    });
  } catch (err) {
    logger.error(err);
  }
}
bootstrap();
