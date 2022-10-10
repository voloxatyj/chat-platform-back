import 'reflect-metadata';
import { Session, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import { AppDataSource } from './utils/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = AppDataSource.getRepository(Session);
  const { PORT, COOKIE_SECRET } = process.env;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 864000000,
      },
      store: new TypeormStore()
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () =>
      console.log(`Aplication is running on port ${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
