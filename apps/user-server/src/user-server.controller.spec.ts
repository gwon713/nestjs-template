// import { Test, TestingModule } from '@nestjs/testing';
// import { UserServerController } from './user-server.controller';
// import { UserServerService } from './user-server.service';

// describe('UserServerController', () => {
//   let userServerController: UserServerController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [UserServerController],
//       providers: [UserServerService],
//     }).compile();

//     userServerController = app.get<UserServerController>(UserServerController);
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(userServerController.getHello()).toBe('Hello World!');
//     });
//   });
// });

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserServerService } from './user-server.service';
import { INestApplication } from '@nestjs/common';
import { UserServerModule } from './user-server.module';

describe('UserServerController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserServerModule],
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

  // /*
  it('/POST User 1', () => {
    return request(app.getHttpServer())
      .post('/v1/user')
      .send({
        uid: 'qSQbYyYruEPWnYe3tgPC3xjid1N2',
        email: 'projaguar@gmail.com',
        emailVerified: true,
        displayName: '이승우',
        isAnonymous: false,
        photoURL:
          'https://lh3.googleusercontent.com/a/AATXAJw-7zR57Ei7Bphe_FmLIDhvIjHl15enop_sIfvJ=s96-c',
        providerData: [
          {
            providerId: 'google.com',
            uid: '104651812297889061709',
            displayName: '이승우',
            email: 'projaguar@gmail.com',
            phoneNumber: null,
            photoURL:
              'https://lh3.googleusercontent.com/a/AATXAJw-7zR57Ei7Bphe_FmLIDhvIjHl15enop_sIfvJ=s96-c',
          },
        ],
        createdAt: '1630512373736',
        lastLoginAt: '1630589372276',
        appName: '[DEFAULT]',
      })
      .expect(201);
  });
  // */

  /*
  it('/POST User 2', () => {
    return request(app.getHttpServer())
      .post('/v1/user')
      .send({
        USER: {
          email: 'projaguar3@gmail.com',
          name: '홍길동3',
          photoUrl:
            'https://lh3.googleusercontent.com/a/AATXAJw-7zR57Ei7Bphe_FmLIDhvIjHl15enop_sIfvJ=s96-c',
          lastVisit: 1630589372276,
          nickname: '길동이3',
          userId: 'abcedfghijklmn3',
        },
      })
      .expect(201);
  });
  */

  /*
  it('/POST User 3', () => {
    return request(app.getHttpServer())
      .post('/v1/user')
      .send({
        USER: {
          email: 'projaguar4@gmail.com',
          name: '홍길동4',
          photoUrl:
            'https://lh3.googleusercontent.com/a/AATXAJw-7zR57Ei7Bphe_FmLIDhvIjHl15enop_sIfvJ=s96-c',
          lastVisit: 1630589372276,
          nickname: '길동이4',
          userId: 'abcedfghijklmn4',
        },
      })
      .expect(201);
  });
  */

  /*
  it('/Get User By Email', () => {
    return request(app.getHttpServer())
      .get('/v1/user/email/projaguar@gmail.com')
      .expect(200);
  });
  */
});
