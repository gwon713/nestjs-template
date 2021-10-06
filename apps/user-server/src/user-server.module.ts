import { Module } from '@nestjs/common';
import { UserServerController } from './user-server.controller';
import { UserServerService } from './user-server.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@forme/user';
import { MallModule } from '@forme/mall';
import { ManagerModule } from '@forme/manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    MallModule,
    ManagerModule,
  ],
  controllers: [UserServerController],
  providers: [UserServerService],
})
export class UserServerModule {}
