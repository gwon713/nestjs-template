import type { DynamoDB } from 'aws-sdk';

type DynamoDBTypes = 'string' | 'number' | 'binary';

type ToolboxData = {
  partitionKey: string;
  sortKey?: string;
  attributes?: {
    [key: string]: DynamoDBTypes;
  };
  indexes?: any;
  name: string;
};

function getAttributes(tableDefinition: DynamoDB.CreateTableInput) {
  const typesMap: { [key: string]: DynamoDBTypes } = {
    S: 'string',
    N: 'number',
    B: 'binary',
  };

  return tableDefinition.AttributeDefinitions.reduce((previous, current) => {
    return {
      ...previous,
      [current.AttributeName]: typesMap[current.AttributeType],
    };
  }, {});
}

function getPartitionKey(tableDefinition: DynamoDB.CreateTableInput) {
  return tableDefinition.KeySchema.find((k) => {
    return k.KeyType.toUpperCase() === 'HASH';
  }).AttributeName;
}

function getSortKey(tableDefinition: DynamoDB.CreateTableInput) {
  const rangeAttribute = tableDefinition.KeySchema.find((k) => {
    return k.KeyType.toUpperCase() === 'RANGE';
  });
  return rangeAttribute ? rangeAttribute.AttributeName : undefined;
}

function getIndexes(tableDefinition: DynamoDB.CreateTableInput) {
  return tableDefinition.GlobalSecondaryIndexes.reduce((previous, current) => {
    const keyDef = current.KeySchema.reduce((prev, curr) => {
      if (curr.KeyType.toUpperCase() === 'HASH') {
        return { ...prev, partitionKey: curr.AttributeName };
      }
      if (curr.KeyType.toUpperCase() === 'RANGE') {
        return { ...prev, sortKey: curr.AttributeName };
      }
    }, {});
    return {
      ...previous,
      [current.IndexName]: keyDef,
    };
  }, {});
}

export const dynamoSdkToToolbox = (
  tableDefinition: DynamoDB.CreateTableInput,
): ToolboxData => ({
  partitionKey: getPartitionKey(tableDefinition),
  sortKey: getSortKey(tableDefinition),
  // attributes: getAttributes(tableDefinition),
  indexes: getIndexes(tableDefinition),
  name: tableDefinition.TableName,
});
