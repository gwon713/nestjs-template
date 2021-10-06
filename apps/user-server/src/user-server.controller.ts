import { MallService } from '@forme/mall';
import { CreateMallDto, UpdateMallDto } from '@forme/mall/mall.dto';
import { ManagerService } from '@forme/manager';
import {
  CreateManagerDto,
  ManagerDto,
  UpdateManagerDto,
} from '@forme/manager/manager.dto';
import { UserService } from '@forme/user';
import { FbUserToUserPipe } from '@forme/user/pipes/fbuser-to-user.pipe';
import { ParseDetailQueryPipe } from '@forme/utils/pipes/parse-detail-query.pipe';
import { ParseListQueryPipe } from '@forme/utils/pipes/parse-list-query.pipe';
import { ParseObjectPipe } from '@forme/utils/pipes/parse-object.pipe';

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
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DetailQueryType, ListQueryType } from 'libs/types/src';
import { MallIdValidationPipe } from './mall-id-validation.pipe';
import { UserIdValidationPipe } from './user-id-valdation.pipe';
import { UserServerService } from './user-server.service';

@Controller('v1')
export class UserServerController {
  constructor(
    private readonly userServerService: UserServerService,
    private readonly userService: UserService,
    private readonly mallService: MallService,
    private readonly managerService: ManagerService,
  ) {}

  // ---- TEST ----

  @Get()
  getHello(): string {
    return this.userServerService.getHello();
  }

  // ---- user(기본) 관련 ----

  @ApiOperation({
    summary: 'sign in 정보 등록',
    description: `
      firebase login 후에 관련 정보를 등록한다. 신규등록, 사용자의 로그인 모두 처리한다. 
      firebase status 정보를 변경 없이 보내면, FbUserToUserPipe에서 변환한다.
      `,
  })
  @Post('user')
  @UsePipes(new FbUserToUserPipe())
  postUser(@Body() user): Promise<any> {
    return this.userService.post(user);
  }

  @ApiOperation({
    summary: 'user 정보 update',
    description: 'user 정보 update',
  })
  @Put('user')
  @UsePipes(new UserIdValidationPipe())
  putUser(@Body() params): Promise<any> {
    return this.userService.put(params);
  }

  @Delete('user/:userId')
  deleteUser(@Param('userId') userId: string): Promise<any> {
    return this.userService.delete(userId);
  }

  @ApiOperation({
    summary: '전체 유저 목록',
    description: '전체 유저 목록 조회',
  })
  @ApiQuery({
    name: 'options',
    required: false,
  })
  @Get('user')
  @UsePipes(new ParseObjectPipe())
  getUsers(@Query('options') options?) {
    // param 처리
    // const optionsObj: UserListQueryType = JSON.parse(options || '{}');
    let count = (options && options.count) || 20;
    let startKey = (options && options.startKey) || null;

    return this.userService.getItems(count, startKey);
  }

  @ApiQuery({
    name: 'options',
    required: false,
  })
  @Get('user/:userId')
  getUser(@Param('userId') userId: string): Promise<any> {
    return this.userService.getItem(userId);
  }

  @Get('user/email/:email')
  getUserByEmail(@Param('email') email: string): Promise<any> {
    return this.userService.getByEmail(email);
  }

  // ---- MALL 부분 ----

  @ApiOperation({
    summary: '전체 Mall 목록',
    description: '전체 mall 목록 조회',
  })
  @ApiQuery({
    name: 'options',
    required: false,
  })
  @Get('mall')
  @UsePipes(new ParseListQueryPipe())
  getMalls(@Query('options') options?: ListQueryType) {
    if (!options || !options.isAll) {
      return this.mallService.getItems(
        options && options.count,
        options && options.startKey,
        options && options.attributes,
      );
    }

    return this.mallService.getAllItems(options && options.attributes);
  }

  @ApiOperation({
    summary: 'Mall 정보 등록',
    description: 'mall 정보 신규 등록 또는 전체 데이터 치환',
  })
  @Post('mall')
  @UsePipes(new MallIdValidationPipe())
  postMall(@Body() mall: CreateMallDto): Promise<any> {
    return this.mallService.post(mall);
  }

  @ApiOperation({
    summary: 'mall 정보 update',
    description: 'mall 정보 update',
  })
  @Put('mall')
  @UsePipes(new MallIdValidationPipe())
  updateMall(@Body() params: UpdateMallDto): Promise<any> {
    return this.mallService.put(params);
  }

  @ApiQuery({
    name: 'options',
    required: false,
  })
  @Get('mall/:mallId')
  @UsePipes(new ParseDetailQueryPipe())
  getMall(
    @Param('mallId') mallId: string,
    @Query('options') options?: DetailQueryType,
  ): Promise<any> {
    return this.mallService.getItem(mallId);
  }

  @Delete('mall/:mallId')
  deleteMall(@Param('mallId') mallId: string): Promise<any> {
    return this.mallService.delete(mallId);
  }

  // ---- MALL Manager 부분 ----
  @ApiOperation({
    summary: 'Mall 관리자 등록',
    description: 'mall 관리자 등록',
  })
  @Post('manager')
  @UsePipes(new MallIdValidationPipe(), new UserIdValidationPipe())
  postManager(@Body() manager: CreateManagerDto): Promise<any> {
    return this.managerService.post(manager);
  }

  @ApiOperation({
    summary: 'mall 관리자 정보 update',
    description: 'mall 정보 update',
  })
  @Put('manager')
  @UsePipes(new MallIdValidationPipe(), new UserIdValidationPipe())
  updateManager(@Body() params: UpdateManagerDto): Promise<any> {
    return this.managerService.put(params);
  }

  @ApiQuery({
    name: 'options',
    required: false,
  })
  @Get('manager/:mallId')
  getManagers(@Param('mallId') mallId: string): Promise<any> {
    return this.managerService.getItems(mallId);
  }

  @ApiQuery({
    name: 'options',
    required: false,
  })
  @Get('manager')
  getAllManagers(): Promise<any> {
    return this.managerService.getAllItems();
  }

  @Delete('manager/:mallId/:userId')
  deleteManager(
    @Param('mallId') mallId: string,
    @Param('userId') userId: string,
  ): Promise<any> {
    return this.managerService.delete(mallId, userId);
  }

  @Get('manager/:mallId/:userId')
  getManager(
    @Param('mallId') mallId: string,
    @Param('userId') userId: string,
  ): Promise<any> {
    console.log('>>>', mallId, userId);
    return this.managerService.getItem(mallId, userId);
  }

  //
  // ---- 가입자 통계 부분 ----
  // 없어도 될것 같다
  //
  @Put('user/statistics/visit')
  @ApiOperation({
    summary: '일별 접속 통계 추가',
    description: '일별 접속 통계 추가',
  })
  addVisit(): Promise<any> {
    return this.userService.addVisit();
  }

  @Put('user/statistics/join')
  @ApiOperation({
    summary: '일별 가입 통계 추가',
    description: '일별 가입 통계 추가',
  })
  addJoin(): Promise<any> {
    return this.userService.addJoin();
  }
}
