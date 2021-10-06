import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContractDto {
  @ApiProperty()
  contractId: string;
  @ApiPropertyOptional()
  status: string;
  @ApiProperty()
  contractDate?: string;
  @ApiProperty()
  contractType?: string;
  @ApiProperty()
  contractTitle?: string;
  @ApiProperty()
  contractCompany?: string;
  @ApiProperty()
  contractStart?: string;
  @ApiProperty()
  contractEnd?: string;
}

export class ContractDetailDto {
  @ApiProperty()
  contractId: string;
  @ApiPropertyOptional()
  status: string;
  @ApiProperty()
  amount?: 0;
  @ApiProperty()
  count?: 0;
}

export class CreateContractDto {
  @ApiProperty({ type: ContractDto })
  'CONTRACT': ContractDto;
  @ApiProperty({ type: ContractDetailDto })
  'CONTRACT#DETAIL': ContractDetailDto;
}

export class UpdateContractDto {
  @ApiPropertyOptional({ type: ContractDto })
  'CONTRACT': ContractDto;
  @ApiPropertyOptional({ type: ContractDetailDto })
  'CONTRACT#DETAIL': ContractDetailDto;
}
