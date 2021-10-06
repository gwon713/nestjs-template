import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamodbService {
  documentClient;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
    this.documentClient = new DynamoDB.DocumentClient({});
  }

  getDocumentClient() {
    return this.documentClient;
  }
}
