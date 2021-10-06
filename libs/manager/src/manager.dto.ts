import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerDto {
  @ApiProperty()
  status?: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  mallId: string;

  // user 관련 정보
  @ApiPropertyOptional()
  email?: string;
  @ApiPropertyOptional()
  name?: string;

  // mall 관련 정보
  @ApiPropertyOptional()
  title?: string;

  // 메뉴 권한 목록
  @ApiProperty()
  authority?: string[];
}

export class CreateManagerDto {
  @ApiProperty({ type: ManagerDto })
  'MANAGER': ManagerDto;
}

export class UpdateManagerDto {
  @ApiProperty({ type: ManagerDto })
  'MANAGER': ManagerDto;
}
