import { Test, TestingModule } from '@nestjs/testing';
import { ContractService } from './contract.service';
import { MovieService } from './movie.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@forme/utils';

describe('ContractService, MovieService', () => {
  let contractService: ContractService;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        UtilsModule,
      ],
      providers: [ContractService, MovieService],
      exports: [ContractService, MovieService],
    }).compile();

    contractService = module.get<ContractService>(ContractService);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  ////// contract test
  /*
  it('post contract test', async () => {
    const res = await contractService.post({
      contractId: 'aaaaaaaa',
      status: 'valid',
      summary: {
        contractDate: new Date().toISOString(),
        contractType: 'FLAT',
        contractTitle: '첫번째 계약 제목',
        contractCompany: '주식회사',
        contractStart: new Date().toISOString(),
        contractEnd: new Date().toISOString(),
      },
      detail: {
        amount: 100000000,
        count: 1,
      },
    });
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('post contract test', async () => {
    const res = await contractService.post({
      contractId: 'aaaaaaaa',
      status: 'valid',
      summary: {
        contractDate: new Date().toISOString(),
        contractType: 'FLAT',
        contractTitle: '처음 계약 타이틀',
        contractCompany: '계약 회사',
      },
      detail: {
        amount: 100000000,
        count: 5,
      },
    });
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });

  
  it('put contract test', async () => {
    const res = await contractService.put({
      contractId: 'aaaaaaaa',
      status: 'valid',
      summary: {
        contractType: 'RS',
        contractTitle: '처음 계약 타이틀 수정',
        contractCompany: '계약 회사 수정',
      },
      detail: {
        amount: 300000000,
        count: 1,
      },
    });
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  */
  /*
  it('delete contract test', async () => {
    const res = await contractService.delete('aaaaaaaa');
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('get contract test', async () => {
    const res = await contractService.getItem('aaaaaaaa');
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  */

  it('get contract test', async () => {
    const res = await contractService.getItems();
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });

  ////// contract test - end

  ////// movie test

  /*
  it('post movie test', async () => {
    const res = await movieService.post({
      movieId: 'movie0000',
      contractId: 'aaaaaaaa',
      status: 'valid',
      summary: {
        title: '첫번째 영화',
        thumbnail: '아직 없어요',
        rated: '청불',
        scheduleStart: new Date().toISOString(),
        scheduleEnd: new Date().toISOString(),
        previewCdn: 'prevcdn 없어요',
        category: '#영화#성인',
        // statistics
        click: 0,
        view: 0,
        like: 0,
      },
      detail: {
        movieCdn: '아직 없어요',
        summary: '줄거리 줄거리 줄거리',
      },
    });
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });

  it('post movie test', async () => {
    const res = await movieService.post({
      movieId: 'movie0001',
      contractId: 'aaaaaaaa',
      status: 'valid',
      summary: {
        title: '두번째 영화',
        thumbnail: ' ----- ',
        rated: '청불',
        scheduleStart: new Date().toISOString(),
        scheduleEnd: new Date().toISOString(),
        previewCdn: 'prevcdn XXXX ',
        category: '#영화#코미디',
        // statistics
        click: 0,
        view: 0,
        like: 0,
      },
      detail: {
        movieCdn: ' ----- ',
        summary: '줄거리 줄거리 줄거리 //// ',
      },
    });
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  
  it('put movie test', async () => {
    const res = await movieService.put({
      movieId: 'movie0000',
      summary: {
        // title: '타이틀 수정',
      },
      detail: {
        summary: '줄거리 수정 테스트',
      },
    });
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  
  it('delete movie test', async () => {
    const res = await movieService.delete('movie0000');
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  

  it('get movie test', async () => {
    const res = await movieService.getItem('movie0001');
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  
  it('get movie test', async () => {
    const res = await movieService.getItems();
    console.log('>>> ', res);
    expect(res).not.toBeNull();
  });
  */
});
