import { Test, TestingModule } from '@nestjs/testing';
import { SessionController } from './session.controller';
import { INestApplication } from '@nestjs/common';
import { NestUserFactory } from 'test';
import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/database/database.module';
import request from 'supertest';
import { hash } from 'bcryptjs';

describe('SessionController (E2E)', () => {
  let app: INestApplication;
  let userFactory: NestUserFactory;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [NestUserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get<NestUserFactory>(NestUserFactory);
    await app.init();
  });

  test('[POST] /session', async () => {
    await userFactory.makePrismaUser({
      email: 'johndoe@example.com',
      password: await hash('password', 8),
    });

    const response = await request(app.getHttpServer()).post('/session').send({
      email: 'johndoe@example.com',
      password: 'password',
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
