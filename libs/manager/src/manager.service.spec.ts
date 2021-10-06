import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@forme/utils';

import { ManagerService } from './manager.service';

describe('ManagerService', () => {
  let service: ManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        UtilsModule,
      ],
      providers: [ManagerService],
    }).compile();

    service = module.get<ManagerService>(ManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
  it('post manager test', async () => {
    const res = await service.post({
      MANAGER: {
        userId: 'qSQbYyYruEPWnYe3tgPC3xjid1N2',
        mallId: 'A123123',
        authority: ['aaa', 'bbb', 'ccc'],
      },
    });
    expect(res).not.toBeNull();
  });
  */

  /*
  it('put manager test', async () => {
    const res = await service.put({
      MANAGER: {
        userId: 'qSQbYyYruEPWnYe3tgPC3xjid1N2',
        mallId: 'A123123',
        authority: ['aaa', 'bbb', 'ccc', 'ddd'],
      },
    });
    expect(res).not.toBeNull();
  });
  */

  /*
  it('get managers test', async () => {
    const res = await service.getItem(
      'qSQbYyYruEPWnYe3tgPC3xjid1N2',
      'A123123',
    );
    console.log(res);
    expect(res).not.toBeNull();
  });
  */

  /*
  it('get all managers test', async () => {
    const res = await service.getAllItems();
    console.log(res);
    expect(res).not.toBeNull();
  });
  */
});
