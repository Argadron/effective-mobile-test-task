import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import PrismaTestClient from '../src/prismaClient.forTest'
import { PrismaService } from '../src/prisma/prisma.service';
import { UserService } from '../src/user/user.service';
import { UserController } from '../src/user/user.controller';

const prisma = PrismaTestClient()

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [PrismaService, UserService]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(`/api`)

    await app.init();
  });

  it('/user/problem (PUT)', () => {
    return request(app.getHttpServer())
      .put('/api/user/problem')
      .expect(200);
  });

  afterAll(() => {
    prisma.user.updateMany({
        data: {
            problems: true
        }
    })
})
});
