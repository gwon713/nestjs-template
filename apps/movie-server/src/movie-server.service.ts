import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
