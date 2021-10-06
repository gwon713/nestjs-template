import { Injectable } from '@nestjs/common';
import { DynamodbService } from '@forme/utils/dynamodb/dynamodb.service';
import { ConfigService } from '@nestjs/config';
import { getMallTable, getMallEntities } from './mall.model';
import { ApiService } from '@forme/utils/api/api.service';
import { CreateMallDto, UpdateMallDto } from './mall.dto';
import { Entity } from 'dynamodb-toolbox';

@Injectable()
export class MallService {
  documentClient;
  api;

  mallTable;
  mallEntities;

  constructor(
    private readonly configService: ConfigService,
    private readonly dynamodbService: DynamodbService,
    private readonly apiService?: ApiService,
  ) {
    // api initialize
    this.api = this.apiService.getAxios();
    this.api.defaults.port = configService.get<number>('PORT_MALL');

    // (dynamodb toolobx) table instance 생성
    this.mallTable = getMallTable(
      this.configService.get<string>('TABLE_MALL'),
      this.dynamodbService.getDocumentClient(),
    );
    // (dynamodb toolobx) entity instance 생성 (for dynamodb toolbox)
    this.mallEntities = getMallEntities(this.mallTable);
  }

  post(params: CreateMallDto) {
    // 해당 레코드가 없을때만 request 처리
    return this.mallTable.transactWrite([
      ...Object.keys(params).map((key) =>
        this.mallEntities[key].putTransaction(
          params[key],
          key === 'MALL' && { conditions: { attr: 'mallId', exists: false } },
        ),
      ),
    ]);
  }

  put(params: UpdateMallDto) {
    return this.mallTable.transactWrite(
      Object.keys(params).map((key) =>
        this.mallEntities[key].updateTransaction(params[key]),
      ),
    );
  }

  delete(mallId: string) {
    return this.mallTable.transactWrite(
      Object.values(this.mallEntities).map((entity: Entity<any>) =>
        entity.deleteTransaction({ mallId: mallId }),
      ),
    );
  }

  getItem(mallId: string) {
    const pk = `MALL#${mallId}`;
    const params = {
      beginsWith: 'MALL#',
    };

    return this.mallTable.query(pk, params);
  }

  getItems(count?: number, startKey?: any, attributes?: string[]) {
    const params: any = {
      limit: (count && +count) || undefined,
      reverse: true,
      index: 'gsi_et',
      attributes: attributes || undefined,
      startKey: startKey || undefined,
    };

    return this.mallTable.query('MALL', params);
  }

  async getAllItems(attributes?: string[]) {
    const params: any = {
      index: 'gsi_et',
      attributes: attributes || undefined,
    };

    let result = {
      Items: [],
      Count: 0,
      ScannedCount: 0,
    };

    let res = await this.mallTable.query('MALL', params);
    result.Items = result.Items.concat(res.Items);
    result.Count += res.Count;
    result.ScannedCount += res.ScannedCount;

    while (!!res.LastEvaluatedKey) {
      res = await res.next();
      result.Items = result.Items.concat(res.Items);
      result.Count += res.Count;
      result.ScannedCount += res.ScannedCount;
    }

    return result;
  }
}
