import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Table, Entity } from 'dynamodb-toolbox';

export const getMallTable = (
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

export const getMallEntity = (table: Table) => {
  return new Entity({
    name: 'MALL',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `${data._et}#${data.mallId}`,
      },
      sk: { sortKey: true, default: (data) => `${data._et}#${data.mallId}` },
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
        default: (data) => data.pk,
      },
      status: { type: 'string', default: 'valid' },
      mallId: { type: 'string', required: true },
      title: { type: 'string' },
      tags: { type: 'list' },
      thumbnail: { type: 'string' },
    },
    table: table,
  });
};

export const getMallDetailEntity = (table: Table) => {
  return new Entity({
    name: 'MALL#DETAIL',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `MALL#${data.mallId}`,
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
      // gsi2, gsi_et 사용 안함

      gsi2_pk: { partitionKey: 'gsi2' },
      gsi2_sk: { sortKey: 'gsi2' },
      
      gsi_et_pk: { partitionKey: 'gsi_et', default: (data) => data._et },
      gsi_et_sk: {
        sortKey: 'gsi_et',
        default: (data) => data.pk,
      },
      */

      status: { type: 'string', default: 'valid' },
      mallId: { type: 'string', required: true },

      subTitle: { type: 'string' },
      tags: { type: 'list' },
      manager: { type: 'string' },
      email: { type: 'string' },
      phoneNumber: { type: 'string' },
      address: { type: 'string' },
    },
    table: table,
  });
};

export const getMallEntities = (table: Table) => {
  return {
    MALL: getMallEntity(table),
    'MALL#DETAIL': getMallDetailEntity(table),
  };
};
