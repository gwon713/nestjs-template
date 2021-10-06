import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Table, Entity } from 'dynamodb-toolbox';

export const getManagerTable = (
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
    },
    DocumentClient: documentClient,
  });
};

export const getManagerEntity = (table: Table) => {
  return new Entity({
    name: 'MANAGER',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `USER#${data.userId}`,
      },
      sk: { sortKey: true, default: (data) => `MALL#${data.mallId}` },
      gsi1_pk: {
        partitionKey: 'gsi1',
        default: (data) => data.sk,
      },
      gsi1_sk: {
        sortKey: 'gsi1',
        default: (data) => data.pk,
      },
      /*
      // gsi2 사용 안함

      gsi2_pk: { partitionKey: 'gsi2' },
      gsi2_sk: { sortKey: 'gsi2' },
      */
      gsi_et_pk: { partitionKey: 'gsi_et', default: (data) => data._et },
      gsi_et_sk: {
        sortKey: 'gsi_et',
      },

      status: { type: 'string', default: 'valid' },
      userId: { type: 'string', required: true },
      mallId: { type: 'string', required: true },

      // user 관련 정보
      email: { type: 'string' },
      name: { type: 'string' },

      // mall 관련 정보
      title: { type: 'string' },

      // 메뉴 권한 목록
      authority: { type: 'list' },

      //
      // 저장되지 않는 필드
      //
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

export const getManagerEntities = (table: Table) => {
  return {
    MANAGER: getManagerEntity(table),
  };
};
