import { dynamoSdkToToolbox } from '@forme/utils/dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Table, Entity } from 'dynamodb-toolbox';
import * as TABLE_DEF from './table-movie.json';

export const getMovieEntity = (table: Table) => {
  return new Entity({
    name: 'MOVIE',
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
        default: (data) => `MOVIE#${data.movieId}`,
      },
      sk: { sortKey: true, default: (data) => `MOVIE#${data.movieId}` },
      gsi1_pk: {
        partitionKey: 'gsi1',
        default: (data) => `CONTRACT#${data.contractId}`,
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
      movieId: { type: 'string', required: true },
      contractId: { type: 'string', required: true },
      title: { type: 'string', required: true },
      thumbnail: { type: 'string', required: true },
      rated: { type: 'string', required: true },
      previewCdn: { type: 'string' },
      category: { type: 'string' },
      click: { type: 'number', default: 0 },
      view: { type: 'number', default: 0 },
      like: { type: 'number', default: 0 },
      scheduleStart: { type: 'string', required: true },
      scheduleEnd: { type: 'string', required: true },
    },
    table: table,
  });
};

export const getMovieDetailEntity = (table: Table) => {
  return new Entity({
    name: 'MOVIE#DETAIL',
    attributes: {
      pk: {
        partitionKey: true,
        default: (data) => `MOVIE#${data.movieId}`,
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
      movieId: { type: 'string', required: true },
      contractId: { type: 'string', required: true },
      movieCdn: { type: 'string', required: true },
      summary: { type: 'string' },
    },
    table: table,
  });
};

export const getMovieTable = (documentClient?: DocumentClient) => {
  return new Table({
    ...dynamoSdkToToolbox(TABLE_DEF.Table),
    DocumentClient: documentClient,
  });
};

export const getMovieEntities = (table: Table) => {
  return {
    MOVIE: getMovieEntity(table),
    'MOVIE#DETAIL': getMovieDetailEntity(table),
  };
};
