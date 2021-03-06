// import { Test, TestingModule } from '@nestjs/testing';
// import { MovieServerController } from './movie-server.controller';
// import { MovieServerService } from './movie-server.service';

// describe('MovieServerController', () => {
//   let movieServerController: MovieServerController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [MovieServerController],
//       providers: [MovieServerService],
//     }).compile();

//     movieServerController = app.get<MovieServerController>(MovieServerController);
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(movieServerController.getHello()).toBe('Hello World!');
//     });
//   });
// });

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MovieServerModule } from './movie-server.module';
import { ConfigModule } from '@nestjs/config';
// import { UtilsModule } from '@forme/utils';

describe('UserServerController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        // UtilsModule,
        MovieServerModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET Hello`, () => {
    return request(app.getHttpServer())
      .get('/v1')
      .expect(200)
      .expect('Hello World!');
  });

  /// contract test ----------------------------------
  /*
  it('/Get contracts', async () => {
    const response = await request(app.getHttpServer())
      .get(`/v1/contract`)
      .query({
        options: {
          count: 3,
          attributes: ['pk', 'sk'],
          isAll: true,
        },
      });
    console.log('>>', response.body);
    expect(response.status).toBe(200);
  });
  */

  /*
  it('/Post contract =', () => {
    return request(app.getHttpServer())
      .post('/v1/contract')
      .send({
        contractId: 'aaaaaaaa',
        status: 'valid',
        summary: {
          contractDate: new Date().toISOString(),
          contractType: 'FLAT',
          contractTitle: '????????? ?????? ??????',
          contractCompany: '????????????',
          contractStart: new Date().toISOString(),
          contractEnd: new Date().toISOString(),
        },
        detail: {
          amount: 100000000,
          count: 1,
        },
      })
      .expect(201);
  });

  it('/Post contract 1', () => {
    return request(app.getHttpServer())
      .post('/v1/contract')
      .send({
        contractId: 'bbbbbb',
        status: 'valid',
        summary: {
          contractDate: new Date().toISOString(),
          contractType: 'RS',
          contractTitle: '????????? ?????? ??????',
          contractCompany: '???????????? ???',
          contractStart: new Date().toISOString(),
          contractEnd: new Date().toISOString(),
        },
        detail: {
          amount: 300000000,
          count: 10,
        },
      })
      .expect(201);
  });
  */
  /*
  it('/Put contract 1', () => {
    return request(app.getHttpServer())
      .put('/v1/contract')
      .send({
        contractId: 'bbbbbb',
        status: 'valid',
        summary: {
          contractTitle: '????????? ?????? ?????? ??????',
        },
        detail: {
          amount: 300000001,
        },
      })
      .expect(200);
  });
  */

  /*
  it('/Get Contract', async () => {
    const response = await request(app.getHttpServer())
      .get(`/v1/contract/bbbbbb`)
      .query({
        options: {
          types: ['aaa', 'bbb'],
        },
      });
    console.log(response.body);
    expect(response.status).toBe(200);
  });
  */

  /*
  it('/Delete Contract', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/v1/contract/aaaaaaaa`,
    );

    console.log(response.body);
    expect(response.status).toBe(200);
  });
  */

  /// movie test ----------------------------------

  /*
  it('/Get movie', async () => {
    const response = await request(app.getHttpServer())
      .get(`/v1/movie`)
      .query({
        options: {
          count: 3,
          attributes: ['pk', 'sk'],
          isAll: true,
        },
      });
    console.log('>>', response.body);
    expect(response.status).toBe(200);
  });
  */
  /*
  it('/Post movie =', () => {
    return request(app.getHttpServer())
      .post('/v1/movie')
      .send({
        movieId: '0001',
        contractId: 'bbbbbb',
        status: 'valid',
        summary: {
          title: '????????? 1',
          thumbnail: '??????',
          rated: '19???',
          scheduleStart: new Date().toISOString(),
          scheduleEnd: new Date().toISOString(),
          previewCdn: '??????',
          category: '#??????#??????',
          // statistics
          click: 0,
          view: 0,
          like: 0,
        },
        detail: {
          movieCdn: 'https://///////',
          summary: '?????????????????? ?????????',
        },
      })
      .expect(201);
  });

  it('/Post movie =', () => {
    return request(app.getHttpServer())
      .post('/v1/movie')
      .send({
        movieId: '0002',
        contractId: 'bbbbbb',
        status: 'valid',
        summary: {
          title: '????????? 2',
          thumbnail: '??????',
          rated: '19???',
          scheduleStart: new Date().toISOString(),
          scheduleEnd: new Date().toISOString(),
          previewCdn: '??????',
          category: '#??????#??????',
          // statistics
          click: 0,
          view: 0,
          like: 0,
        },
        detail: {
          movieCdn: 'https://///////2',
          summary: '?????????????????? ?????????2',
        },
      })
      .expect(201);
  });
  */

  /*
  it('/Put movie 1', () => {
    return request(app.getHttpServer())
      .put('/v1/movie')
      .send({
        movieId: '0002',
        summary: {
          title: '????????? 2 222 ??????',
        },
        detail: {
          summary: '?????????????????? ?????????2 ????????????',
        },
      })
      .expect(200);
  });
  */

  /*
  it('/Get Movie', async () => {
    const response = await request(app.getHttpServer()).get(`/v1/movie/0002`);
    console.log(response.body);
    expect(response.status).toBe(200);
  });
  */

  /*
  it('/Delete Movie', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/v1/movie/0002`,
    );

    console.log(response.body);
    expect(response.status).toBe(200);
  });
  */
});
