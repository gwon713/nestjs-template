import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiService } from './api.service';

@Module({
  imports: [ConfigModule],
  providers: [ApiService],
})
export class ApiModule {}
