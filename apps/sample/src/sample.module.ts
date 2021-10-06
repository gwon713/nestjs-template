import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigTestModule } from './config-test/config-test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigTestModule,
  ],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
