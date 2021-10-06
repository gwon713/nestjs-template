import { Test, TestingModule } from '@nestjs/testing';
import { ConfigTestController } from './config-test.controller';
import { ConfigTestService } from './config-test.service';

describe('ConfigTestController', () => {
  let controller: ConfigTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigTestController],
      providers: [ConfigTestService],
    }).compile();

    controller = module.get<ConfigTestController>(ConfigTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
