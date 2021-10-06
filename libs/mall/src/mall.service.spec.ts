import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@forme/utils';
import { MallService } from './mall.service';

describe('MallService', () => {
  let service: MallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        UtilsModule,
      ],
      providers: [MallService],
    }).compile();

    service = module.get<MallService>(MallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
  it('post mall test', async () => {
    const res = await service.post({
      MALL: {
        status: 'valid',
        mallId: 'A123123',
        title: '우리쇼핑몰',
        tags: ['aaa', 'bbb', 'ccc'],
      },
      'MALL#DETAIL': {
        status: 'valid',
        mallId: 'A123123',
        subTitle: 'sub title',
        manager: '홍길동',
        email: 'abc@def.def',
      },
    });
    expect(res).not.toBeNull();
  });
  */

  /*
  it('update mall test', async () => {
    const res = await service.put({
      // MALL: {
      //   mallId: 'A123123',
      //   title: '우리쇼핑몰 호호호',
      // },
      'MALL#DETAIL': {
        mallId: 'A123123',
        manager: '홍길동 AAA',
      },
    });
    expect(res).not.toBeNull();
  });
  */

  /*
  it('get mall test', async () => {
    const res = await service.getItem('A123123');
    console.log(res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('delete mall list', async () => {
    const res = await service.delete('A123123');
    console.log(res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('get mall list', async () => {
    const res = await service.getItems(3, null, ['pk', 'sk']);
    console.log(res);
    expect(res).not.toBeNull();
  });
  */
  /*
  it('get all mall list', async () => {
    const res = await service.getAllItems(['mallId']);
    console.log(res);
    expect(res).not.toBeNull();
  });
  */
});
