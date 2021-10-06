import { Injectable } from '@nestjs/common';
import { DynamodbService } from '@forme/utils/dynamodb/dynamodb.service';

import { Table, Entity } from 'dynamodb-toolbox';
import { isEmpty } from '@forme/utils';
import { getMovieEntities, getMovieTable } from './movie.model';
import { getContractEntities, getContractTable } from './contract.model';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';

@Injectable()
export class MovieService {
  documentClient;

  movieTable: Table;
  movieEntities;

  contractTable: Table;
  contractEntities;

  constructor(
    private readonly dynamodbService: DynamodbService, // private readonly contractService: ContractService,
  ) {
    // movie table
    this.movieTable = getMovieTable(this.dynamodbService.getDocumentClient());
    this.movieEntities = getMovieEntities(this.movieTable);

    // contract table
    this.contractTable = getContractTable(
      this.dynamodbService.getDocumentClient(),
    );

    this.contractEntities = getContractEntities(this.contractTable);
  }

  post(params: CreateMovieDto) {
    return this.movieTable.transactWrite([
      // 해당 계약 레코드가 있는 지 확인
      this.contractEntities['CONTRACT'].conditionCheck(
        { contractId: params.MOVIE.contractId },
        { conditions: { attr: 'contractId', exists: true } },
      ),

      // summary data 기록
      ...Object.keys(params).map((key) =>
        this.movieEntities[key].putTransaction(params[key]),
      ),
    ]);
  }

  put(params: UpdateMovieDto) {
    return this.movieTable.transactWrite(
      Object.keys(params).map((key) =>
        this.movieEntities[key].updateTransaction(params[key]),
      ),
    );
  }

  delete(movieId: string) {
    return this.movieTable.transactWrite(
      Object.values(this.movieEntities).map((entity: Entity<any>) =>
        entity.deleteTransaction({ movieId: movieId }),
      ),
    );
  }

  //
  // summary 와 detail 한꺼번에
  //
  getItem(movieId: string) {
    const pk = `MOVIE#${movieId}`;
    const params = {
      beginsWith: 'MOVIE#',
    };

    return this.movieTable.query(pk, params);
  }

  //
  // summary만 list로
  //
  getItems(count: number = 20, startKey?: any) {
    const params: any = {
      limit: count,
      reverse: true,
      index: 'gsi_et',
    };

    if (!isEmpty(startKey)) {
      params.startKey = startKey;
    }

    return this.movieTable.query('MOVIE', params);
  }
}
