import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConfigTestService } from './config-test.service';

@Controller('config-test')
export class ConfigTestController {
  constructor(private readonly configTestService: ConfigTestService) {}

  @Get()
  getEnvValue(@Query('key') key: string): string {
    return this.configTestService.getEnvValue(key);
  }
}
