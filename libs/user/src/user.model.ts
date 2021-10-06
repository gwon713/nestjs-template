import { getDayString } from '@forme/utils';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Table, Entity } from 'dynamodb-toolbox';

export const getUserTable = (
  tableName: string,
  documentClient: DocumentClient,
) => {
  return new Table({
    name: tableName,
    partitionKey: 'pk',
    sortKey: 'sk',
    indexes: {
      gsi1: { partitionKey: 'gsi1_pk', sortKey: 'gsi1_sk' },
      gsi2: { partitionKey: 'gsi2_pk', sortKey: 'gsi2_sk' },
      gsi_et: { partitionKey: 'gsi_et_pk', sortKey: 'gsi_et_sk' },
      gsi_email: { partitionKey: 'gsi_email_pk' },
    },
    DocumentClient: documentClient,
  });
};

export const getUserEntity = (table: Table) => {
  return new Entity({
    name: 'USER',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `${data._et}#${data.userId}`,
      },
      sk: { sortKey: true, default: (data) => `${data._et}#${data.userId}` },
      gsi1_pk: {
        partitionKey: 'gsi1',
        default: (data) => `${data._et}#${data.userId}`,
      },
      gsi1_sk: {
        sortKey: 'gsi1',
        default: (data) => `${data._et}#${data.userId}`,
      },
      /*
      // gsi2 사용 안함

      gsi2_pk: { partitionKey: 'gsi2' },
      gsi2_sk: { sortKey: 'gsi2' },
      */
      gsi_et_pk: { partitionKey: 'gsi_et', default: (data) => data._et },
      gsi_et_sk: {
        sortKey: 'gsi_et',
        default: (data) => data.pk,
      },

      gsi_email_pk: {
        partitionKey: 'gsi_email',
        default: (data) => data.email,
      },

      status: { type: 'string', default: 'valid' },
      userId: { type: 'string', required: true },
      email: { type: 'string' },
      name: { type: 'string' },
      nickname: { type: 'string' },
      lastVisit: { type: 'number' },
      photoUrl: { type: 'string' },
      providerId: { type: 'string' },
      phoneNumber: { type: 'string' },

      // 저장되지 않는 필드
      // 단지 dynamodb toolbox 자체 참조를 위해
      datestring: [
        'gsi_et_sk',
        0,
        {
          type: 'string',
          required: true,
          save: false,
          default: () => {
            return new Date().toISOString();
          },
        },
      ],
      // end
    },
    table: table,
  });
};

export const getUserTokenEntity = (table: Table) => {
  return new Entity({
    name: 'USER#TOKEN',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `USER#${data.userId}`,
      },
      sk: { sortKey: true, default: (data) => `${data._et}` },
      gsi1_pk: {
        partitionKey: 'gsi1',
        default: (data) => data.pk,
      },
      gsi1_sk: {
        sortKey: 'gsi1',
        default: (data) => data.sk,
      },

      /*
      // gsi2 사용 안함
      // gsi_et 사용 안함

      gsi_et_pk: { partitionKey: 'gsi_et', default: (data) => data._et },
      gsi_et_sk: {
        sortKey: 'gsi_et',
      },
      */

      status: { type: 'string', default: 'valid' },
      userId: { type: 'string' },
      refreshToken: { type: 'string' },
      accessToken: { type: 'string' },
      expirationTime: { type: 'number' },
    },
    table: table,
  });
};

export const getUserProviderEntity = (table: Table) => {
  return new Entity({
    name: 'USER#PROVIDER',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `USER#${data.userId}`,
      },
      sk: { sortKey: true, default: (data) => `${data._et}` },
      gsi1_pk: {
        partitionKey: 'gsi1',
        default: (data) => data.pk,
      },
      gsi1_sk: {
        sortKey: 'gsi1',
        default: (data) => data.sk,
      },

      /*
      // gsi2 사용 안함
      // gsi_et 사용 안함

      gsi_et_pk: { partitionKey: 'gsi_et', default: (data) => data._et },
      gsi_et_sk: {
        sortKey: 'gsi_et',
      },
      */

      status: { type: 'string', default: 'valid' },
      userId: { type: 'string' },
      providerId: { type: 'string' },
      uid: { type: 'string' },
      displayName: { type: 'string' },
      email: { type: 'string' },
      phoneNumber: { type: 'string' },
      photoURL: { type: 'string' },
    },
    table: table,
  });
};

export const getUserDayStatisticsEntity = (table) => {
  return new Entity({
    name: 'STATISTICS',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `${data._et}#${data.day}`,
      },
      sk: {
        sortKey: true,
        default: (data) => `${data._et}#${data.day}`,
      },
      gsi_et_pk: { partitionKey: 'gsi_et', default: (data) => data._et },
      gsi_et_sk: {
        sortKey: 'gsi_et',
        default: (data) => data.pk,
      },

      // 일별 가입 수
      join: { type: 'number', default: 1 },
      // 일별 방문자 수 (중복 허용)
      visit: { type: 'number', default: 1 },
      // 탈퇴 수
      unsubscribe: { type: 'number', default: 0 },

      // 저장되지 않는 필드
      // 단지 내부 참조를 위해
      day: {
        type: 'string',
        required: true,
        save: false,
        default: getDayString(),
      },
    },
    table: table,
  });
};

export const getUserEntities = (table: Table) => {
  return {
    USER: getUserEntity(table),
    'USER#TOKEN': getUserTokenEntity(table),
    'USER#PROVIDER': getUserProviderEntity(table),
  };
};
