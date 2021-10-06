import { UtilsModule } from '@forme/utils';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        UtilsModule,
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
  it('post user test', async () => {
    const res = await service.post({
      USER: {
        status: 'valid',
        userId: 'qSQbYyYruEPWnYe3tgPC3xjid1N2',
        email: 'projaguar@gmail.com',
        name: '이승우',
        nickname: '이승우',
        lastVisit: '1630589372276',
        photoUrl:
          'https://lh3.googleusercontent.com/a/AATXAJw-7zR57Ei7Bphe_FmLIDhvIjHl15enop_sIfvJ=s96-c',
      },
      'USER#PROVIDER': {
        status: 'valid',
        userId: 'qSQbYyYruEPWnYe3tgPC3xjid1N2',
        providerId: 'google.com',
        uid: '104651812297889061709',
        displayName: '이승우',
        email: 'projaguar@gmail.com',
        phoneNumber: null,
        photoURL:
          'https://lh3.googleusercontent.com/a/AATXAJw-7zR57Ei7Bphe_FmLIDhvIjHl15enop_sIfvJ=s96-c',
      },
      'USER#TOKEN': {
        status: 'valid',
        userId: 'qSQbYyYruEPWnYe3tgPC3xjid1N2',
        refreshToken:
          'ACzBnChuiyGPhRS3Rpda4qNhyM3fsDqNPdiUZ4N-C30b8i3A-1-1IPaqFKbzDxnTmKvjDNc8HLB3cg5KO3VffFQ-p4qP1FuGY-lR4YKO2AthrdvUr-ZE47Iiq8XGigrU57-pduM2PUu4dS-Xvv8bihhYp_xsecA1QB4H4lm1WgCvgDTracO_VXsjhI9Rnhg1mjKQcZ2y9JASLa3_qGv_bFzqUGismMjQ1n4PX3K0kqn58DP7C-MvqCCfnHgUhVa6Dpd-1P-qxV0MMZEU4mjBMYyPNelrJzLE_wO33wNYngSSWxT-RfgsnuBGqCthlIQQVuNxNgTljN2hpquuO99mwJNrtnkmz4Nty8BLG8VBGVK7KnahdsvkId_PyVhATB2vU0shYHEhS7PfSEuytOtt0P-cmCUJsPs6pg',
        accessToken:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjZGFiZDIwNzVjODQxNDI0NDY3MTNlM2U0NGU5ZDcxOGU3YzJkYjQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi7J207Iq57JqwIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnctN3pSNTdFaTdCcGhlX0ZtTElEaHZJakhsMTVlbm9wX3NJZnZKPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Zvcm1lLTI3YTIzIiwiYXVkIjoiZm9ybWUtMjdhMjMiLCJhdXRoX3RpbWUiOjE2MzA1ODkzNzIsInVzZXJfaWQiOiJxU1FiWXlZcnVFUFduWWUzdGdQQzN4amlkMU4yIiwic3ViIjoicVNRYll5WXJ1RVBXblllM3RnUEMzeGppZDFOMiIsImlhdCI6MTYzMDU4OTM3MiwiZXhwIjoxNjMwNTkyOTcyLCJlbWFpbCI6InByb2phZ3VhckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNDY1MTgxMjI5Nzg4OTA2MTcwOSJdLCJlbWFpbCI6WyJwcm9qYWd1YXJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.RkScEmRvo0dNLT-ZIDyipZd13a3kMiIY9Omr7suxoeaIzc4lI6NYFY27F_oabtDpwD0WAzCUFimxDVuukn5UCxSgnxZQZem7oTlsZIe33I3UBpMOWq8Q5ZituGbpknB2aQkdiQiiJIqg6xx1VOAVyrRBaBLoHuQ87b0ftYHTqZw-_AvCu2-zh1xzYRSgyrb2sbxFfxaHYCNk6UCQSxea8-H5vQiDnBQAK4oMNyP2Yt024wUpiVG_L8b-YFSCmEN3vf5ztTgJdGOYnyFWvuelz-UUQFzDhvTyibVDwZh_d5QECUACW7um6NqMcxK7RfhWo6IcxRT0CcXx5_PO1KMlxg',
        expirationTime: 1630592972373,
      },
    });
    console.log('res', res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('put user test', async () => {
    const res = await service.put({
      USER: {
        userId: 'abcedfghijklmn',
        name: '홍길동 수정',
        nickname: '길동이 수정',
      },
    });
    expect(res).not.toBeNull();
  });
  */

  /*
  it('get user test', async () => {
    const res = await service.getItem('qSQbYyYruEPWnYe3tgPC3xjid1N2');
    console.log(res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('update user test', async () => {
    const res = await service.put({
      'USER#PROVIDER': {
        userId: 'qSQbYyYruEPWnYe3tgPC3xjid1N2',
        $remove: ['displayName'],
      },
    });
    expect(res).not.toBeNull();
  });
  */

  /*
  it('get user list', async () => {
    const res = await service.getItems();
    console.log(res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('delete user test', async () => {
    const res = await service.delete('qSQbYyYruEPWnYe3tgPC3xjid1N2');
    console.log(res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('get user by email test', async () => {
    const res = await service.getByEmail('projaguar@gmail.com');
    console.log(res);
    expect(res).not.toBeNull();
  });
  */
});
