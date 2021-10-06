import { Injectable, UsePipes } from '@nestjs/common';
import { DynamodbService } from '@forme/utils/dynamodb/dynamodb.service';
import { ConfigService } from '@nestjs/config';
import {
  getUserTable,
  getUserEntities,
  getUserDayStatisticsEntity,
} from './user.model';
import { ApiService } from '@forme/utils/api/api.service';
import { isEmpty } from '@forme/utils';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Entity } from 'dynamodb-toolbox';

@Injectable()
export class UserService {
  documentClient;
  api;

  userTable;
  userEntities;

  userDayStatisticEntity;

  constructor(
    private readonly configService: ConfigService,
    private readonly dynamodbService: DynamodbService,
    private readonly apiService: ApiService,
  ) {
    // api initialize
    this.api = this.apiService.getAxios();
    this.api.defaults.port = configService.get<number>('PORT_USER');

    // table instance 생성 (for dynamodb toolobx)
    this.userTable = getUserTable(
      this.configService.get<string>('TABLE_USER'),
      this.dynamodbService.getDocumentClient(),
    );

    this.userEntities = getUserEntities(this.userTable);
    this.userDayStatisticEntity = getUserDayStatisticsEntity(this.userTable);
  }

  async post(user: CreateUserDto) {
    try {
      //
      // 기존 유저의 경우
      //
      // 1. master record의 lastVisit update
      // 2. token record 통째로 upddate
      //

      const result = await this.userTable.transactWrite([
        // master entity
        this.userEntities['USER'].updateTransaction(
          {
            userId: user.USER.userId,
            lastVisit: user.USER.lastVisit,
          },
          {
            conditions: [
              { attr: 'pk', exists: true },
              { attr: 'sk', exists: true },
            ],
          },
        ),
        ...(user['USER#PROVIDER']
          ? [
              this.userEntities['USER#PROVIDER'].putTransaction(
                user['USER#PROVIDER'],
              ),
            ]
          : []),
        ...(this.userEntities['USER#TOKEN']
          ? [this.userEntities['USER#TOKEN'].putTransaction(user['USER#TOKEN'])]
          : []),
      ]);

      // 방문 count 증가
      await this.addVisit();

      return result;
    } catch (error) {
      //
      //
      // 신규 유저의 경우
      // master 및 관련 레코드 신규 등록
      //
      if (error.code === 'TransactionCanceledException') {
        const result = await this.userTable.transactWrite(
          Object.keys(user).map((key) =>
            this.userEntities[key].putTransaction(user[key]),
          ),
        );

        // 신규 유저 카운트 증가
        await this.addJoin();
        return result;
      }

      console.log('NEW USER');
      throw error;
    }
  }

  put(params: UpdateUserDto) {
    console.log('>>> ', params);
    return this.userTable.transactWrite(
      Object.keys(params).map((key) =>
        this.userEntities[key].updateTransaction(params[key]),
      ),
    );
  }

  delete(userId: string) {
    return this.userTable.transactWrite(
      Object.values(this.userEntities).map((entity: Entity<any>) =>
        entity.deleteTransaction({ userId: userId }),
      ),
    );
  }

  getItem(userId: string) {
    const pk = `USER#${userId}`;
    const params = {
      beginsWith: 'USER#',
    };

    return this.userTable.query(pk, params);
  }

  getItems(count: number = 20, startKey?: any, attributes?: string[]) {
    const params: any = {
      limit: count,
      reverse: true,
      index: 'gsi_et',
      attributes: attributes || undefined,
      startKey: startKey || undefined,
    };

    return this.userTable.query('USER', params);
  }

  getByEmail(email: string) {
    const params: any = {
      index: 'gsi_email',
    };

    return this.userTable.query(email, params);
  }

  // statistics
  async addJoin() {
    try {
      return await this.addStatistics(1, 0);
    } catch (error) {
      if (error.code === 'ConditionalCheckFailedException') {
        return this.putUserStatistics();
      }
      throw error;
    }
  }

  async addVisit() {
    try {
      return await this.addStatistics(0, 1);
    } catch (error) {
      if (error.code === 'ConditionalCheckFailedException') {
        return this.putUserStatistics();
      }
      throw error;
    }
  }

  addStatistics(join: number, visit: number) {
    return this.userDayStatisticEntity.update(
      {
        join: { $add: join },
        visit: { $add: visit },
      },
      {
        conditions: [
          { attr: 'pk', exists: true },
          { attr: 'sk', exists: true },
        ],
      },
    );
  }

  putUserStatistics() {
    // default 값으로 새로운 record insert
    return this.userDayStatisticEntity.put({});
  }
}
