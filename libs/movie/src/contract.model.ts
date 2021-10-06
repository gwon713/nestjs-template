import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Table, Entity } from 'dynamodb-toolbox';
import * as TABLE_DEF from './table-movie.json';
import { dynamoSdkToToolbox } from '@forme/utils/dynamodb';

export const getContractEntity = (table: Table) => {
  return new Entity({
    name: 'CONTRACT',
    attributes: {
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

      pk: {
        partitionKey: true,
        default: (data) => `CONTRACT#${data.contractId}`,
      },
      sk: { sortKey: true, default: (data) => `CONTRACT#${data.contractId}` },
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

      gsi2_pk: { partitionKey: 'gsi2' },
      gsi2_sk: { sortKey: 'gsi2' },
      */
      gsi_et_pk: { partitionKey: 'gsi_et', default: (data) => data._et },
      gsi_et_sk: {
        sortKey: 'gsi_et',
      },

      status: { type: 'string', default: 'valid' },
      // summary(list) 정보
      contractId: { type: 'string', required: true },
      contractDate: { type: 'string', default: (data) => data.datestring },
      contractType: {
        type: 'string',
        required: true,
      },
      contractTitle: { type: 'string', required: true },
      contractCompany: { type: 'string', required: true },
      contractStart: { type: 'string', default: (data) => data.datestring },
      contractEnd: { type: 'string', default: (data) => data.datestring },
    },
    table: table,
  });
};

export const getContractDetailEntity = (table: Table) => {
  return new Entity({
    name: 'CONTRACT#DETAIL',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `CONTRACT#${data.contractId}`,
      },
      sk: { sortKey: true, default: (data) => data._et },

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
      // summary(list) 정보
      contractId: { type: 'string', required: true },
      amount: { type: 'number', default: 0 },
      count: { type: 'number', default: 1 },
    },
    table: table,
  });
};

export const getContractTable = (documentClient?: DocumentClient) => {
  return new Table({
    ...dynamoSdkToToolbox(TABLE_DEF.Table),
    DocumentClient: documentClient,
  });
};

export const getContractEntities = (table: Table) => {
  return {
    CONTRACT: getContractEntity(table),
    'CONTRACT#DETAIL': getContractDetailEntity(table),
  };
};
