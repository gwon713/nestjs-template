import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SampleService {
  getHello(): string {
    return 'Hello World!';
  }
}
