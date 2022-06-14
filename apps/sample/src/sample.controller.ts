import { Controller, Get } from '@nestjs/common';
import { SampleService } from './sample.service';

@Controller()
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  getHello(): string {
    return this.sampleService.getHello();
  }
}
