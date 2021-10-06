import { Module } from '@nestjs/common';
import { MallService } from './mall.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@forme/utils';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [MallService],
  exports: [MallService],
})
export class MallModule {}
