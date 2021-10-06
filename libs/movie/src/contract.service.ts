import { Injectable } from '@nestjs/common';
import { DynamodbService } from '@forme/utils/dynamodb/dynamodb.service';
import { getContractTable, getContractEntities } from './contract.model';

import { Table, Entity } from 'dynamodb-toolbox';
import { isEmpty } from '@forme/utils';
import { getMovieEntities, getMovieTable } from './movie.model';
import { CreateContractDto, UpdateContractDto } from './contract.dto';

@Injectable()
export class ContractService {
  documentClient;

  contractTable: Table;
  contractEntities;

  movieTable: Table;
  movieEntities;

  constructor(
    private readonly dynamodbService: DynamodbService, // private readonly movieService: MovieService,
  ) {
    this.contractTable = getContractTable(
      this.dynamodbService.getDocumentClient(),
    );
    this.contractEntities = getContractEntities(this.contractTable);

    this.movieTable = getMovieTable(this.dynamodbService.getDocumentClient());
    this.movieEntities = getMovieEntities(this.movieTable);
  }

  // 등록 또는 치환
  post(params: CreateContractDto) {
    return this.contractTable.transactWrite(
      Object.keys(params).map((key) =>
        this.contractEntities[key].putTransaction(params[key]),
      ),
    );
  }

  // 수정
  put(params: UpdateContractDto) {
    return this.contractTable.transactWrite(
      Object.keys(params).map((key) =>
        this.contractEntities[key].updateTransaction(params[key]),
      ),
    );
  }

  // 계약 및 관련 영화 삭제
  async delete(contractId: string) {
    // 계약 관련 정보 조회
    const contract = await this.getItem(contractId);

    //
    // 관련 영화 한개씩 삭제
    //
    // TODO: movie service 객체를 생성해서 delete 함수를 사용하여 지우는것을 시도 하였으나 오류, 그래서 코드 복사. 확인해볼것
    //
    //
    for (let item of contract.Items) {
      if (item._et === 'MOVIE') {
        await this.movieTable.transactWrite(
          Object.values(this.movieEntities).map((entity: Entity<any>) =>
            entity.deleteTransaction({ movieId: item.movieId }),
          ),
        );
      }
    }

    // 계약 정보 삭제
    return this.contractTable.transactWrite(
      Object.values(this.contractEntities).map((entity: Entity<any>) =>
        entity.deleteTransaction({ contractId: contractId }),
      ),
    );
  }

  //
  // summary 와 detail 과 movie list까지 한꺼번에
  //
  getItem(contractId: string) {
    const pk = `CONTRACT#${contractId}`;
    const params: any = {
      index: 'gsi1',
    };
    return this.contractTable.query(pk, params);
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

    return this.contractTable.query('CONTRACT', params);
  }
}
