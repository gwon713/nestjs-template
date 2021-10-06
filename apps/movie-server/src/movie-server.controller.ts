import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { MovieServerService } from './movie-server.service';
import { MovieService } from '@forme/movie';
import { ParseListQueryPipe } from '@forme/utils/pipes/parse-list-query.pipe';
import { ListQueryType } from '@forme/types';
import { ContractService } from '@forme/movie/contract.service';
import { KeysValidationPipe } from '@forme/utils/pipes/keys-validation.pipe';
import {
  CreateContractDto,
  UpdateContractDto,
} from '@forme/movie/contract.dto';
import { CreateMovieDto, UpdateMovieDto } from '@forme/movie/movie.dto';

@ApiTags('movie')
@Controller('v1')
export class MovieServerController {
  constructor(
    private readonly movieServerService: MovieServerService,
    private readonly contractService: ContractService,
    private readonly movieService: MovieService,
  ) {}

  // ---- TEST ----

  @Get()
  getHello(): string {
    return this.movieServerService.getHello();
  }

  // ---- CONTRACT ----

  @ApiOperation({
    summary: '전체 계약 목록',
    description: '전체 계약 목록 (summary)',
  })
  @ApiQuery({
    name: 'options',
    required: false,
  })
  @Get('contract')
  @UsePipes(new ParseListQueryPipe())
  getContracts(@Query('options') options?: ListQueryType) {
    const count = (options && options.count) || 20;
    const startKey = (options && options.startKey) || null;

    return this.contractService.getItems(count, startKey);
  }

  @ApiOperation({
    summary: '계약 등록 / 치환',
  })
  @Post('contract')
  postContract(@Body() contract: CreateContractDto): Promise<any> {
    console.log('contract', JSON.stringify(contract));
    return this.contractService.post(contract);
  }

  @ApiOperation({
    summary: '계약 attribute value 변경',
  })
  @Put('contract')
  putContract(@Body() contract: UpdateContractDto): Promise<any> {
    return this.contractService.put(contract);
  }

  @ApiOperation({
    summary: '계약 상세 조회',
    description:
      '계약 요약, 계약 상세내용, 계약과 관련된 영화 목록을 같이 전송',
  })
  @Get('contract/:contractId')
  getContract(@Param('contractId') contractId: string): Promise<any> {
    return this.contractService.getItem(contractId);
  }

  @ApiOperation({
    summary: '계약 정보 삭제',
    description: '계약정보와 관련 영화 목록을 모두 삭제',
  })
  @Delete('contract/:contractId')
  deleteContract(@Param('contractId') contractId: string): Promise<any> {
    return this.contractService.delete(contractId);
  }

  // ---- MOVIE ----
  @ApiOperation({
    summary: '영화 목록',
    description: '전체 영화 목록 (summary)',
  })
  @ApiQuery({
    name: 'options',
    required: false,
  })
  @Get('movie')
  @UsePipes(new ParseListQueryPipe())
  getMovies(@Query('options') options?: ListQueryType) {
    const count = (options && options.count) || 20;
    const startKey = (options && options.startKey) || null;

    return this.movieService.getItems(count, startKey);
  }

  @ApiOperation({
    summary: '영화 등록 / 치환',
    description: '등록시에선 contractId 및 movieId 모두 필수',
  })
  @Post('movie')
  @UsePipes(new KeysValidationPipe(['contractId', 'movieId']))
  postMovie(@Body() movie: CreateMovieDto): Promise<any> {
    return this.movieService.post(movie);
  }

  @ApiOperation({
    summary: '영화 attribute value 변경',
    description: '업데이트 시에는 movieId만 필수',
  })
  @Put('movie')
  @UsePipes(new KeysValidationPipe(['movieId']))
  putMovie(@Body() movie: UpdateMovieDto): Promise<any> {
    return this.movieService.put(movie);
  }

  @ApiOperation({
    summary: '영화 상세 조회',
    description: '영화 요약 및 상세 내용',
  })
  @Get('movie/:movieId')
  getMovie(@Param('movieId') movieId: string): Promise<any> {
    return this.movieService.getItem(movieId);
  }

  @ApiOperation({
    summary: '영화 정보 삭제',
    description: '영화 정보 삭제',
  })
  @Delete('movie/:movieId')
  deleteMovie(@Param('movieId') movieId: string): Promise<any> {
    return this.movieService.delete(movieId);
  }
}
