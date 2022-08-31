import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { AdminDto } from '../src/auth/dto/admin-dto';
import { ERROR_ADMIN_INVALID_PASSWORD, ERROR_ADMIN_NOT_FOUND } from '../src/auth/auth.messages';

const loginDto: AdminDto = {
  email: 'danila718@gmail.com',
  password: 'qwerty',
};

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login').send(loginDto);
    expect(res.statusCode).toBe(200);
    expect(res.body.access_token).toBeDefined();
  });

  it('/auth/login (POST) - user not found', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, email: 'test@test.com' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(ERROR_ADMIN_NOT_FOUND);
  });

  it('/auth/login (POST) - invalid password', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: 'invalid' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(ERROR_ADMIN_INVALID_PASSWORD);
  });

  afterAll(() => {
    // app.close();
    disconnect();
  });
});
