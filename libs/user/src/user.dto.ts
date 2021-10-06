import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  status?: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  nickname?: string;
  @ApiProperty()
  lastVisit?: number;
  @ApiProperty()
  photoUrl?: string;
  @ApiProperty()
  providerId?: string;
  @ApiProperty()
  phoneNumber?: string;
}

export class UserProviderDto {
  @ApiProperty()
  status?: string;
  @ApiProperty()
  userId?: string;
  @ApiProperty()
  providerId?: string;
  @ApiProperty()
  uid?: string;
  @ApiProperty()
  displayName?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  phoneNumber?: string;
  @ApiProperty()
  photoURL?: string;
}

export class UserTokenDto {
  @ApiProperty()
  status?: string;
  @ApiProperty()
  userId?: string;
  @ApiProperty()
  refreshToken?: string;
  @ApiProperty()
  accessToken?: string;
  @ApiProperty()
  expirationTime?: number;
}

export class UserDetailDto {
  @ApiProperty({ type: UserDto })
  'USER': UserDto;
  @ApiPropertyOptional({ type: UserProviderDto })
  'USER#PROVIDER': UserProviderDto;
  @ApiPropertyOptional({ type: UserTokenDto })
  'USER#TOKEN': UserTokenDto;
}

export class CreateUserDto {
  @ApiProperty({ type: UserDto })
  'USER': UserDto;
  @ApiPropertyOptional({ type: UserProviderDto })
  'USER#PROVIDER'?: UserProviderDto;
  @ApiPropertyOptional({ type: UserTokenDto })
  'USER#TOKEN'?: UserTokenDto;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ type: UserDto })
  'USER'?: UserDto;
  @ApiPropertyOptional({ type: UserProviderDto })
  'USER#PROVIDER'?: UserProviderDto;
  @ApiPropertyOptional({ type: UserTokenDto })
  'USER#TOKEN'?: UserTokenDto;
}
