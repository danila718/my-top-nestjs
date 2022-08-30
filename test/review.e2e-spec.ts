import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { REVIEW_ERROR_NOT_FOUND } from '../src/review/review.messages';

const product = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание',
  rating: 5.0,
  product,
};

describe('Review (e2e)', () => {
  let app: INestApplication;
  let createdId: Types.ObjectId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) - success', async () => {
    const res = await request(app.getHttpServer()).post('/review/create').send(testDto);
    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.product).toBeDefined();
    createdId = res.body._id;
  });

  it('/review/byProduct/:productId (GET) - success', async () => {
    const res = await request(app.getHttpServer()).get('/review/byProduct/' + product);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('/review/byProduct/:productId (GET) - fail', async () => {
    const res = await request(app.getHttpServer()).get(
      '/review/byProduct/' + new Types.ObjectId().toHexString(),
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it('/review/:id (DELETE) - success', async () => {
    const res = await request(app.getHttpServer()).delete('/review/' + createdId);
    expect(res.statusCode).toBe(200);
  });

  it('/review/:id (DELETE) - fail', async () => {
    const res = await request(app.getHttpServer()).delete(
      '/review/' + new Types.ObjectId().toHexString(),
    );
    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({
      statusCode: 404,
      message: REVIEW_ERROR_NOT_FOUND,
    });
  });

  afterAll(() => {
    // app.close();
    disconnect();
  });
});
