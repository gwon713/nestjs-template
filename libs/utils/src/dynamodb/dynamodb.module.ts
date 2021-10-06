import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamodbService } from './dynamodb.service';

@Module({
  imports: [ConfigModule],
  providers: [DynamodbService],
})
export class DynamodbModule {}
