import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigTestService {
  constructor(private configService: ConfigService) {}

  getEnvValue(key: string): string {
    return this.configService.get<string>(key);
  }
}
