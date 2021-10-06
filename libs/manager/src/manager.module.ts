import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@forme/utils';
import { UserModule } from '@forme/user';
import { MallModule } from '@forme/mall';

@Module({
  imports: [ConfigModule, UtilsModule, UserModule, MallModule],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
