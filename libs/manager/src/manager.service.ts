import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { DynamodbService } from '@forme/utils/dynamodb/dynamodb.service';
import { ConfigService } from '@nestjs/config';
import {
  getManagerTable,
  getManagerEntity,
  getManagerEntities,
} from './manager.model';
import { ApiService } from '@forme/utils/api/api.service';
import { getUserEntity, getUserTable } from '@forme/user/user.model';
import { getMallEntity, getMallTable } from '@forme/mall/mall.model';
import { CreateManagerDto, ManagerDto, UpdateManagerDto } from './manager.dto';
import { isEmpty } from '@forme/utils';
import { UpdateMallDto } from '@forme/mall/mall.dto';
import { Entity } from 'dynamodb-toolbox';

@Injectable()
export class ManagerService {
  documentClient;
  api;

  userTable;
  userEntity;

  mallTable;
  mallEntity;

  managerTable;
  managerEntities;

  constructor(
    private readonly configService: ConfigService,
    private readonly dynamodbService: DynamodbService,
    private readonly apiService: ApiService,
  ) {
    // api initialize
    this.api = this.apiService.getAxios();
    this.api.defaults.port = this.configService.get<number>('PORT_MANAGER');

    // User Table
    this.userTable = getUserTable(
      this.configService.get<string>('TABLE_USER'),
      this.dynamodbService.getDocumentClient(),
    );
    // User Eneity
    this.userEntity = getUserEntity(this.userTable);

    // Mall Table
    this.mallTable = getMallTable(
      this.configService.get<string>('TABLE_MALL'),
      this.dynamodbService.getDocumentClient(),
    );
    // Mall Entity
    this.mallEntity = getMallEntity(this.mallTable);

    // table instance 생성 (for dynamodb toolobx)
    this.managerTable = getManagerTable(
      this.configService.get<string>('TABLE_MANAGER'),
      this.dynamodbService.getDocumentClient(),
    );

    // entity instance 생성 (for dynamodb toolbox)
    this.managerEntities = getManagerEntities(this.managerTable);
  }

  async post(params: CreateManagerDto) {
    //
    // manager 신규 등록
    //
    // pk -> user pk
    // sk -> manager pk
    //
    // gsi1_pk -> manager pk
    // gsi1_sk -> user pk
    //

    const userResult = await this.userEntity.get({
      userId: params.MANAGER.userId,
    });
    const mallResult = await this.mallEntity.get({
      mallId: params.MANAGER.mallId,
    });
    if (
      !userResult.Item ||
      !mallResult.Item ||
      isEmpty(userResult.Item) ||
      isEmpty(mallResult.Item)
    ) {
      throw new BadRequestException('user id or mall id is wrong');
    }

    // 조회한 데이터로 값 셋팅
    params.MANAGER.email = userResult.Item.email;
    params.MANAGER.name = userResult.Item.name;
    params.MANAGER.title = userResult.Item.title;

    return this.managerTable.transactWrite([
      ...Object.keys(params).map((key) =>
        this.managerEntities[key].putTransaction(
          params[key],
          key === 'MANAGER' && {
            conditions: [
              { attr: 'pk', exists: false },
              { attr: 'sk', exists: false },
            ],
          },
        ),
      ),
    ]);
  }

  put(params: UpdateManagerDto) {
    return this.managerTable.transactWrite(
      Object.keys(params).map((key) =>
        this.managerEntities[key].updateTransaction(params[key]),
      ),
    );
  }

  delete(userId: string, mallId: string) {
    return this.managerTable.transactWrite(
      Object.values(this.managerEntities).map((entity: Entity<any>) =>
        entity.deleteTransaction({ mallId: mallId, userId: userId }),
      ),
    );
  }

  getItem(userId: string, mallId: string) {
    const pk = `USER#${userId}`;
    const params = {
      eq: `MALL#${mallId}`,
    };

    return this.managerTable.query(pk, params);
  }

  getItems(mallId: string) {
    const params: any = {
      limit: 1000,
      beginsWith: 'USER#',
      reverse: true,
      index: 'gsi1',
    };
    return this.managerTable.query(`MALL#${mallId}`, params);
  }

  async getAllItems() {
    const params: any = {
      reverse: true,
      index: 'gsi_et',
    };

    let result = {
      Items: [],
      Count: 0,
      ScannedCount: 0,
    };

    let res = await this.mallTable.query('MANAGER', params);
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
