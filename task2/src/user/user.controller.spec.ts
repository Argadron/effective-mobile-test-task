import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import PrismaTestClient from '../prismaClient.forTest'
import { PrismaService } from '../prisma/prisma.service';

const prisma = PrismaTestClient()

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });


   it('Set problem flag to false and return count', async () => {
     expect((await userController.update()).count).toBeGreaterThanOrEqual(0);
   });

   afterAll(() => {
    prisma.user.updateMany({
        data: {
            problems: true
        }
    })
})
});
