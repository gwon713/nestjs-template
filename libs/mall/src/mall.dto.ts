import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MallDto {
  @ApiProperty()
  status?: string;
  @ApiProperty()
  mallId: string;
  @ApiProperty()
  title?: string;
  @ApiProperty()
  tags?: string[];
  @ApiProperty()
  thumbnail?: string;
}

export class MallDetailDto {
  @ApiProperty()
  status?: string;
  @ApiProperty()
  mallId: string;
  @ApiProperty()
  subTitle?: string;
  @ApiProperty()
  manager?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  phoneNumber?: string;
  @ApiProperty()
  address?: string;
}

export class CreateMallDto {
  @ApiProperty({ type: MallDto })
  'MALL': MallDto;
  @ApiProperty({ type: MallDetailDto })
  'MALL#DETAIL': MallDetailDto;
}

export class UpdateMallDto {
  @ApiPropertyOptional({ type: MallDto })
  'MALL'?: MallDto;
  @ApiPropertyOptional({ type: MallDetailDto })
  'MALL#DETAIL'?: MallDetailDto;
}
