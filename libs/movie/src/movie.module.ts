import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '@forme/utils';
import { ContractService } from './contract.service';
import { MovieService } from './movie.service';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UtilsModule,
  ],
  providers: [ContractService, MovieService],
  exports: [ContractService, MovieService],
})
export class MovieModule {}
