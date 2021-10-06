import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@forme/utils';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
