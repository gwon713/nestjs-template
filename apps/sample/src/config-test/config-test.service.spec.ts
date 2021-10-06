import { Test, TestingModule } from '@nestjs/testing';
import { ConfigTestService } from './config-test.service';

describe('ConfigTestService', () => {
  let service: ConfigTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigTestService],
    }).compile();

    service = module.get<ConfigTestService>(ConfigTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
