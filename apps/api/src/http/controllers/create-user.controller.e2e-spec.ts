import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NestUserFactory } from 'test';
import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/database/database.module';
import request from 'supertest';
import { PrismaService } from '@/database/prisma/prisma.service';

describe('CreateUserController (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [NestUserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  test('[POST] /users', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'password',
    });

    expect(response.statusCode).toEqual(201);
    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    });

    expect(userOnDatabase).not.toBeNull();
  });
});
