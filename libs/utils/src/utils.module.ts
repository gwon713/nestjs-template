import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { DynamodbService } from './dynamodb/dynamodb.service';
import { DynamodbModule } from './dynamodb/dynamodb.module';
import { ApiModule } from './api/api.module';
import { ApiService } from './api/api.service';

@Module({
  imports: [DynamodbModule, ApiModule],
  providers: [UtilsService, DynamodbService, ApiService],
  exports: [UtilsService, DynamodbService, ApiService],
})
export class UtilsModule {}
